from django.db import models
from datetime import datetime

class Todo:
    def __init__(self, text):
        self.text = text
        self.completed = False
        self.completed_at = ""

    # Serialization to JSON
    def to_dict(self):
        return {
            'text': self.text,
            'completed': self.completed,
            'completed_at': self.completed_at
        }

    def __str__(self):
        return self.text
