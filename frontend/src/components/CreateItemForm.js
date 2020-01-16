import React, {useState, useEffect} from 'react';
import {Button, Divider, Form, Input, InputNumber, Select} from 'antd';
import customAxios from '../helpers/customAxios';
const {Option} = Select;

function CreateItemForm(props) {
  const [catArr, setCatArr] = useState([]);
  const [addNewCategory, setAddNewCategory] = useState(false);

  useEffect(() => {
    customAxios
      .get('inventory/category/all')
      .then(res => setCatArr(res.data.catArr))
      .catch(err => console.log(err));
  }, []);

  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 7},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 10},
    },
  };

  const renderOptions = cat => {
    return <Option value={cat.name}>{cat.name}</Option>;
  };

  return (
    <Form {...formItemLayout}>
      <Form.Item label="Category" required="true">
        <Select
          dropdownRender={menu => (
            <div>
              {menu}
              <Divider style={{margin: '0.25em 0'}} />
              {addNewCategory ? (
                <Input placeholder="New Category" />
              ) : (
                <Button
                  type="normal"
                  icon="plus"
                  onMouseDown={e => e.preventDefault()}
                  onClick={e => setAddNewCategory(true)}>
                  Add New Category
                </Button>
              )}
            </div>
          )}>
          {catArr.map(cat => renderOptions(cat))}
        </Select>
      </Form.Item>
      <Form.Item label="Item Name" required="true">
        <Input size="large" />
      </Form.Item>
      <Form.Item label="Item Description" required="true">
        <Input size="large" />
      </Form.Item>
      <Form.Item label="Item Quantity" required="true">
        <InputNumber size="large" />
      </Form.Item>
    </Form>
  );
}

export default CreateItemForm;
