from cart import Cart
import pytest
from item_database import ItemDatabase
from unittest.mock import Mock

@pytest.fixture
def cart():
    return Cart(5)

def test_can_add_item_to_cart(cart):
    cart.add('sheep')
    assert cart.size() == 1

def test_when_item_added_then_cart_contains_item(cart):
    cart.add('sheep')
    assert "sheep" in cart.get_items()

def test_when_add_more_than_max_items_should_fail(cart):
    for _ in range(5):
        cart.add("goat")

    with pytest.raises(OverflowError):
        cart.add("goat")
    
def test_can_get_total_price(cart):
    print("testing")
    cart.add("sheep pink")
    cart.add("goat blue")

    item_database = ItemDatabase()

    def mock_get_mock_item(item: str):
        if item == "sheep pink":
            return 1.0
        if item == "goat blue":
            return 2.0
    
    item_database.get = Mock(side_effect=mock_get_mock_item)
    assert cart.get_total_price(item_database) == 3.0