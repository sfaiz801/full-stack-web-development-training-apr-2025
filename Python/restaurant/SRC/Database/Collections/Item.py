from SRC.Database.Collections.Path import ITEM_FILE
import os
import json
from SRC.Utility.Error_log import log

class Item:
    def __init__(self):
        self.items = self.load_item()
        
    def load_item(self):
        if(os.path.exists(ITEM_FILE)):
            with open(ITEM_FILE, 'r') as f:
                return json.load(f)
        return {}
                
    def save_item(self):
        try:
            with open(ITEM_FILE, 'w') as f:
                json.dump(self.items, f)
        except Exception as error:
            log(error)
            print(error)
