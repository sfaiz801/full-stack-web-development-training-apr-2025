

from SRC.Database.Collections.Item import Item

from SRC.Utility.color import tcolor
from SRC.Utility.Get_input import get_input
from SRC.Utility.Validation import validate_int
from SRC.Utility.Verify_category import verify_category


def print_item_category():
    print('1. Veg')
    print('2. Non Veg')
    print('3. Soft Drinks')
    print('4. Indian Bread')
    print('5. Salad')
    print('6. Water')
    print('7. Breakfast')
    print('8. Rice Dishes')
    print('9. Ice-cream')

def search_item_by_category():
    print_item_category()
    category = get_input(verify_category, 'Choose a option : ', 'Invalid Option')
    if(not category):
        return
    
    items = Item().items
    if category == "soft_drinks":
        print(f"{tcolor.HEADER}{'ID':<5} {'Name':<20} {'Small':<10} {'Medium':<10}  {'Large':<10}")
    elif category == "water":
        print(f"{tcolor.HEADER}{'ID':<5} {'Name':<20}  {'0.5L':<10}  {'1L':<10}  {'2L':<10}")
    elif category in ["veg", "non_veg", "salad"]:
        print(f"{tcolor.HEADER}{'ID':<5} {'Name':<20} {'Quarter':<10}   {'Half':<10}   {'Full':<10}      {'Ingredients':<30}")
    elif category in ["ice_cream", "sweets"]:
        print(f"{tcolor.HEADER}{'ID':<5} {'Name':<20} {'Price':<10} {'Quantity':<10}")
    elif category == "snacks":
        print(f"{tcolor.HEADER}{'ID':<5} {'Name':<20} {'Price/Packet':<15} {'Quantity':<10}")
    elif category in ["indian_bread", "breakfast", "rice_dishes"]:
        print(f"{tcolor.HEADER}{'ID':<5} {'Name':<20} {'Quarter':<10} {'Half':<10}   {'Full':<10}")
    print("="*110)
    for item in items[category]:
        if category == "soft_drinks":
            print(f"{tcolor.OKGREEN}{item['id']:<5} {item['name']:<20} ₹{item.get('small_price', 'N/A'):<10} ₹{item.get('medium_price', 'N/A'):<10} ₹{item.get('large_price', 'N/A'):<10}")
        elif category == "water":
            print(f"{tcolor.OKGREEN}{item['id']:<5} {item['name']:<20}  ₹{item.get('half_liter_price', 'N/A'):<10} ₹{item.get('one_liter_price', 'N/A'):<10} ₹{item.get('two_liter_price', 'N/A'):<10}")
        elif category in ["veg", "non_veg", "salad"]:
            ingredients = ", ".join(item.get('ingredients', ['N/A']))
            print(f"{tcolor.OKGREEN}{item['id']:<5} {item['name']:<20}  ₹{item.get('quarter_price', 'N/A'):<10}  ₹{item.get('half_price', 'N/A'):<10} ₹{item.get('full_price', 'N/A'):<10} {ingredients:<30}") 
        elif category in ["ice_cream", "sweets"]:
            print(f"{tcolor.OKGREEN}{item['id']:<5} {item['name']:<20} ₹{item.get('price', 'N/A'):<10} {item.get('quantity', 'N/A'):<10}")
        elif category == "snacks":
            print(f"{tcolor.OKGREEN}{item['id']:<5} {item['name']:<20} ₹{item.get('price_per_packet', 'N/A'):<15} {item.get('quantity', 'N/A'):<10}")
        elif category in ["indian_bread", "breakfast", "rice_dishes"]:
            print(f"{tcolor.OKGREEN}{item['id']:<5} {item['name']:<20} ₹{item.get('quarter_price', 'N/A'):<10} ₹{item.get('half_price', 'N/A'):<10} ₹{item.get('full_price', 'N/A'):<10}")

def search_item_by_name():
    try:
        name = input("Enter the name of the item : ")
        
        for category, items in Item().items.items():
            # if category == "soft_drinks":
            #     print(f"{tcolor.HEADER}{'ID':<5} {'Name':<20} {'Small':<10} {'Medium':<10}  {'Large':<10}")
            # elif category == "water":
            #     print(f"{tcolor.HEADER}{'ID':<5} {'Name':<20}  {'0.5L':<10}  {'1L':<10}  {'2L':<10}")
            # elif category in ["veg", "non_veg", "salad"]:
            #     print(f"{tcolor.HEADER}{'ID':<5} {'Name':<20} {'Quarter':<10}   {'Half':<10}   {'Full':<10}      {'Ingredients':<30}")
            # elif category in ["ice_cream", "sweets"]:
            #     print(f"{tcolor.HEADER}{'ID':<5} {'Name':<20} {'Price':<10} {'Quantity':<10}")
            # elif category == "snacks":
            #     print(f"{tcolor.HEADER}{'ID':<5} {'Name':<20} {'Price/Packet':<15} {'Quantity':<10}")
            # elif category in ["indian_bread", "breakfast", "rice_dishes"]:
            #     print(f"{tcolor.HEADER}{'ID':<5} {'Name':<20} {'Quarter':<10} {'Half':<10}   {'Full':<10}")
            for item in items:
                if name.lower() in item['name'].lower():
                    if category == "soft_drinks":
                        print(f"{tcolor.OKGREEN}{item['id']:<5} {item['name']:<20} ₹{item.get('small_price', 'N/A'):<10} ₹{item.get('medium_price', 'N/A'):<10} ₹{item.get('large_price', 'N/A'):<10}")
                    elif category == "water":
                        print(f"{tcolor.OKGREEN}{item['id']:<5} {item['name']:<20}  ₹{item.get('half_liter_price', 'N/A'):<10} ₹{item.get('one_liter_price', 'N/A'):<10} ₹{item.get('two_liter_price', 'N/A'):<10}")
                    elif category in ["veg", "non_veg", "salad"]:
                        ingredients = ", ".join(item.get('ingredients', ['N/A']))
                        print(f"{tcolor.OKGREEN}{item['id']:<5} {item['name']:<20}  ₹{item.get('quarter_price', 'N/A'):<10}  ₹{item.get('half_price', 'N/A'):<10} ₹{item.get('full_price', 'N/A'):<10} {ingredients:<30}") 
                    elif category in ["ice_cream", "sweets"]:
                        print(f"{tcolor.OKGREEN}{item['id']:<5} {item['name']:<20} ₹{item.get('price', 'N/A'):<10} {item.get('quantity', 'N/A'):<10}")
                    elif category == "snacks":
                        print(f"{tcolor.OKGREEN}{item['id']:<5} {item['name']:<20} ₹{item.get('price_per_packet', 'N/A'):<15} {item.get('quantity', 'N/A'):<10}")
                    elif category in ["indian_bread", "breakfast"]:
                        print(f"{tcolor.OKGREEN}{item['id']:<5} {item['name']:<20} ₹{item.get('quarter_price', 'N/A'):<10} ₹{item.get('half_price', 'N/A'):<10} ₹{item.get('full_price', 'N/A'):<10}")
                    elif category == "rice_dishes":
                        print(f"{tcolor.OKGREEN}{item['id']:<5} {item['name']:<20} ₹{item.get('half_plate_price', 'N/A'):<10} ₹{item.get('full_plate_price', 'N/A'):<10} ₹{item.get('full_price', 'N/A'):<10}")

    except Exception as error:
        print(f"{tcolor.FAIL}{error}")