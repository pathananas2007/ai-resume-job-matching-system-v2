from datetime import datetime, timezone
from typing import Optional, Any
from pydantic import BaseModel, Field, ConfigDict
class BaseDocumentModel(BaseModel):



    id: Optional[str] = Field(alias="_id", default=None)



    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))



    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))



    model_config = ConfigDict(



        populate_by_name=True,



        json_encoders={



            datetime: lambda v: v.isoformat()        },



        by_alias=True  # Serialize using aliases (so 'id' becomes '_id')    )
# Alias for backward compatibility ΓÇö used in resumes.py and other modelsMongoModel = BaseDocumentModel