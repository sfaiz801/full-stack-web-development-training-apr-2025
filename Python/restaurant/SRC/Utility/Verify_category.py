









def verify_category(category):
    try:
        category = int(category)
        if category == 1:
            return "veg"
        elif category == 2:
            return "non_veg"
        elif category == 3:
            return "soft_drinks"
        elif category == 4:
            return "indian_bread"
        elif category == 5:
            return "salad"
        elif category == 6:
            return "water"
        elif category == 7:
            return "breakfast"
        elif category == 8:
            return "rice_dishes"
        elif category == 9:
            return "ice_cream"
        else:
            return False
    except Exception as error:
        return False