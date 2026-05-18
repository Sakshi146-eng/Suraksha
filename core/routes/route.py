from fastapi import APIRouter, Depends, HTTPException, File, Form, UploadFile, BackgroundTasks
from typing import Optional
from datetime import datetime
import uuid
from database import contacts_collection, alerts_collection
import os
from models import EmergencyContactsPayload
import uuid
from security import get_current_user
from utils.emergency import handle_emergency
from utils.audio import calculate_final_risk, detect_scream
import json
import shutil
from config import config

router = APIRouter()

@router.post("/emergency")
def add_emergency_contacts(
    payload: EmergencyContactsPayload,
    current_user=Depends(get_current_user)
):
    user_id = str(current_user["_id"])

    # Clear existing contacts to prevent any duplicate/stale database pollution
    contacts_collection.delete_many({"user_id": user_id})

    # Insert the new configured contacts cleanly
    for contact in payload.contacts:
        data = contact.model_dump(exclude_unset=True)
        contacts_collection.insert_one({
            "_id": str(uuid.uuid4()),
            "user_id": user_id,
            **data
        })

    return {"success": True}

@router.get("/contacts")
def get_emergency_contacts(
    current_user=Depends(get_current_user)
):
    user_id = str(current_user["_id"])

    contacts = list(
        contacts_collection.find(
            {"user_id": user_id},
            {"_id": 0, "user_id": 0}
        )
    )

    return {
        "count": len(contacts),
        "contacts": contacts
    }


@router.get("/alerts")
def get_alerts(
    current_user=Depends(get_current_user)
):
    user_id = str(current_user["_id"])

    alerts_cursor = alerts_collection.find(
        {"user_id": user_id},
        {"_id": 1, "risk_level": 1, "timestamp": 1, "location": 1, "address": 1, "actions_taken": 1}
    ).sort("timestamp", -1)

    alerts = []
    for doc in alerts_cursor:
        doc["_id"] = str(doc["_id"])
        # Backwards compatibility and safety fields
        loc = doc.get("location") or {}
        doc["latitude"] = loc.get("latitude", 0)
        doc["longitude"] = loc.get("longitude", 0)
        alerts.append(doc)

    return {"success": True, "alerts": alerts}


@router.post("/alerts")
def create_alert(
    background_tasks: BackgroundTasks,
    location: str = Form(...),
    risk_level: str = Form(None),
    video: Optional[UploadFile] = File(None),
    audio: Optional[UploadFile] = File(None),
    current_user=Depends(get_current_user)
):
    user_id = str(current_user["_id"])

    os.makedirs(config.UPLOAD_DIR, exist_ok=True)
    
    video_path = None
    if video and video.filename:
        video_name = f"{uuid.uuid4()}_{video.filename}"
        video_path = os.path.join(config.UPLOAD_DIR, video_name)
        with open(video_path, "wb") as f:
            shutil.copyfileobj(video.file, f)

    audio_path = None
    if audio and audio.filename:
        audio_name = f"{uuid.uuid4()}_{audio.filename}"
        audio_path = os.path.join(config.UPLOAD_DIR, audio_name)
        with open(audio_path, "wb") as f:
            shutil.copyfileobj(audio.file, f)

    try:
        location_data = json.loads(location)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid location format")

    final_risk = risk_level or "risk"
    if audio_path:
        # Calculate risk based on audio if provided
        final_risk = calculate_final_risk(audio_path)

    result = handle_emergency(
        user_id=user_id,
        risk_level=final_risk,
        location=location_data,
        video_path=video_path,
        keywords=[],
        background_tasks=background_tasks
    )

    if not result.get("success"):
        raise HTTPException(status_code=400, detail=result.get("message", "Failed to send alert"))

    return result