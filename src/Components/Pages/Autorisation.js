import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input, message, Space } from 'antd';
import './Autorisation.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetFirestoreData } from '../../findAll';
import { useNavigate } from 'react-router-dom';

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export const Autorisation = () => {

  const [messageApi, contextHolder] = message.useMessage();
  let accounts = useSelector(state=>state.accounts);
  const history = useNavigate();
  const dispatch = useDispatch();
  

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Invalid username or password',
    });
  };

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Autorisation succeed',
    });
  };


  useEffect(()=> {
    localStorage.getItem('app_token') && history('/')
  }, []);

  useEffect(()=>{
    GetFirestoreData(dispatch)
  },[dispatch]);



  
  const onFinish = (values) => {
    const {username, password, remember} = values
    User_Authen(username, password, remember)
  };

  const User_Authen = (username, password, remember) => {
    if(accounts.length !== 0 && 
      username.length !== 0 && 
      password.length !== 0 && 
      Object.keys(accounts).includes(username) && 
      accounts[username].password === password){
          let data = {}
          data[username] = password
          if(remember === true){
            localStorage.setItem('app_token', JSON.stringify(data))
          }
          setTimeout(()=>history('/'), 1500)
          success()
    }else{error()}
  };
  

  return (
    <div className='auto_cont'>
        <h4>Authentication</h4>
        <hr/>
            <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 12,
              span: 16,
            }}
          >{contextHolder}
            <Space>
              <Button className='login_btn' type="primary" htmlType="submit">
                Log in
              </Button>
            </Space>
          </Form.Item>
        </Form>
    </div>
  )
}

