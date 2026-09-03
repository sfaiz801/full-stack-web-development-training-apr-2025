import maskpass
from SRC.Utility.color import tcolor
from SRC.Utility.Error_log import log

def get_input(validator, msg, error_msg):
    while True:
        
            inp = input(f'{tcolor.OKCYAN}{msg}')
            if inp.lower() == 'exit':
                return False
            result = validator(inp)
            if result: 
                return result
            else:
                print(f'{tcolor.FAIL} {error_msg}')
            
def get_password(validator, msg, error_msg):
    while True:
            inp = maskpass.askpass(f'{tcolor.OKCYAN}{msg}', '*')
            if inp.lower() == 'exit':
                return False
            result = validator(inp)
            if result:
                return inp
            else:
                print(f'{tcolor.FAIL} {error_msg}')
            