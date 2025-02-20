import './CommunityPost.scss';
import { Avatar, Form, Space } from 'antd';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';

function CommunityPost() {
  return (
    <div className="community-post-container">
      <div className="post-home">
      <a href="/Home">Home</a> 
      <span></span>
      </div>
      <div>
        <Form>
            <div className="post-avatar">
            <Space wrap size={16}>
            <Avatar
              size={{
                xs: 16,
                sm: 20,
                md: 24,
                lg: 32,
                xl: 64,
                xxl: 80,
              }}
              icon={<AntDesignOutlined />}
            />
            </Space>
            </div>
        </Form>
        </div>
    </div>
  )
}

export default CommunityPost;