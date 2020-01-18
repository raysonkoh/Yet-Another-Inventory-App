import React, {useState, useEffect, useContext} from 'react';
import {Alert, Button, Divider, Form, Input, InputNumber, Select} from 'antd';
import customAxios from '../helpers/customAxios';
import {UserContext} from '../contexts/UserContext';
const {Option} = Select;

function CreateItemForm(props) {
  const [user, customSetUser] = useContext(UserContext);
  const [catArr, setCatArr] = useState([]);
  const [addNewCategory, setAddNewCategory] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(null);

  const [category, setCategory] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemQuantity, setItemQuantity] = useState(-1);

  const resetForm = () => {
    setCategory('');
    setNewCategoryName('');
    setNewCategoryDescription('');
    setItemName('');
    setItemDescription('');
    setItemQuantity(-1);
  };

  useEffect(() => {
    customAxios
      .get(`inventory/${user.inventoryId}/category/all`)
      .then(res => {
        const categories = res.data.categories;
        setCatArr(categories);
      })
      .catch(err => console.log(err));
  }, []);

  const renderOptions = cat => {
    return <Option value={cat._id}>{cat.name}</Option>;
  };

  const onSubmit = e => {
    if (category === 'other') {
      // new category
      customAxios
        .post('inventory/item/new', {
          headers: {'Content-Type': 'application/json'},
          data: {
            inventoryId: user.inventoryId,
            categoryName: newCategoryName,
            categoryDescription: newCategoryDescription,
            itemName,
            itemDescription,
            itemQuantity,
          },
        })
        .then(res => {
          if (res.status === 200) {
            setIsSuccessful(true);
            resetForm();
          } else {
            setIsSuccessful(false);
          }
        })
        .catch(err => console.log(err));
    } else {
      customAxios
        .post('inventory/item/new', {
          headers: {'Content-Type': 'application/json'},
          data: {
            inventoryId: user.inventoryId,
            catId: category,
            itemName,
            itemDescription,
            itemQuantity,
          },
        })
        .then(res => {
          if (res.status === 200) {
            setIsSuccessful(true);
            resetForm();
          } else {
            setIsSuccessful(false);
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
      {(isSuccessful && (
        <Alert type="success" message="Successfully created item" closable />
      )) ||
        (isSuccessful === false && (
          <Alert type="error" message="An error occurred. Please try again." />
        ))}
      <Form style={{display: 'flex', flexDirection: 'column'}}>
        <Form.Item label="Category" required="true">
          <Select value={category} onChange={e => setCategory(e)}>
            {catArr.map(cat => renderOptions(cat))}
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        {category === 'other' ? (
          <Form.Item label="New Category Information" required="true">
            <Input
              value={newCategoryName}
              onChange={e => setNewCategoryName(e.target.value)}
              placeholder="New Category Name"
            />
            <Input
              value={newCategoryDescription}
              onChange={e => setNewCategoryDescription(e.target.value)}
              placeholder="New Category Description"
            />
          </Form.Item>
        ) : (
          <div />
        )}
        <Form.Item label="Item Name" required="true">
          <Input
            size="large"
            value={itemName}
            onChange={e => setItemName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Item Description" required="true">
          <Input
            size="large"
            value={itemDescription}
            onChange={e => setItemDescription(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Item Quantity" required="true">
          <InputNumber
            size="large"
            value={itemQuantity}
            onChange={e => setItemQuantity(e)}
          />
        </Form.Item>
        <Button
          type="primary"
          size="large"
          style={{width: '5em', alignSelf: 'flex-end'}}
          onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateItemForm;
