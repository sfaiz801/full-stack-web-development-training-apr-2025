from SRC.Database.Collections.Path import LOG_FILE
import os
import json
from datetime import datetime



def log(msg):
    try:
        logs = load_error()
        err = {'date_time' : str(datetime.now()),
            'message' : str(msg)
            }
        logs.append(err)
        with open(LOG_FILE, 'w') as f:
            logg = [err for err in logs]
            json.dump(logg, f, indent=4)
    except Exception as error:
        print(error)
    
def load_error():
    try:
        if(os.path.exists(LOG_FILE)):
            with open(LOG_FILE, 'r') as f:
                return json.load(f)
        else:
            return []
    except Exception as error:
        print(error)