import './CommunityPost.scss';
import { Avatar, Breadcrumb, Form, Input, Tooltip } from 'antd';
import { AntDesignOutlined, FireOutlined, GlobalOutlined, HeartOutlined, MessageOutlined, SaveOutlined, SearchOutlined, SendOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import FPTU from '../../img/FPTU.jpg';
import Carousel from '../../components/carousel/carousel';

function CommunityPost() {

  return (
    <div className="community-post-container">
      <div>
        <Carousel />
      </div>

      <div className="post-home">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: 'Home',
              href: '/watchHome'
            },
            {
              title: 'Bài Viết Cộng Đồng',
              href: '/CommunityPost',
            },
          ]}
        />
      </div>

      <div className="post-form">
        <Form>
            <div className="post-avatar">
              <Avatar size={50} icon={<UserOutlined />} />
                <div className="post-info">
                  <a className="username">FPT University HCM</a>
                  <a className="time">2 hours ago <GlobalOutlined/></a>
                </div>
            </div>

            <div className="post-content">
              <span>
                <FireOutlined /> Sau một tuần trở lại trường, FPTUers đã vào mood chạy deadline chưaa!!?
              </span>
              <span>
                Điểm danh những đồng chí cuối tuần vẫn miệt mài teamworks - taowork nào?
              </span>
              <span className="hashtags">
                #TruongDaiHocFPT #FPTU #FPTUniversity #FPTUniversityLife #FPTFutureYou
              </span>
            </div>

            <div className="post-image">
              <img src={FPTU} alt="" />
            </div>

            <div className="post-like">
              <HeartOutlined />
              <MessageOutlined />
              <SendOutlined />
              <SaveOutlined className="post-save"/>
            </div>

            <div className="post-cmt-container">
            <Avatar.Group
                size="medium"
                max={{
                  count: 2,
                  style: {
                    color: '#f56a00',
                    backgroundColor: '#fde3cf',
                  },
                }}
              >
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=3" />
                <Avatar
                  style={{
                    backgroundColor: '#f56a00',
                  }}
                >
                  K
                </Avatar>
                <Tooltip title="Ant User" placement="top">
                  <Avatar
                    style={{
                      backgroundColor: '#87d068',
                    }}
                    icon={<UserOutlined />}
                  />
                </Tooltip>
                <Avatar
                  style={{
                    backgroundColor: '#1677ff',
                  }}
                  icon={<AntDesignOutlined />}
                />
              </Avatar.Group>

              <span>Liked by <strong>phamtuananh</strong> and others</span>
            </div>

            <div className="post-view-cmt">
              <span>View all 22,300 comments</span>
            </div>      

            <div className="post-text-area">
              <Input 
                placeholder="Add a comment" 
                addonAfter={<SmileOutlined />}
              />
            </div>
        </Form>
      </div>

      <div className="post-view-more">
          <a>View more</a>
      </div>
    </div>
  )
}

export default CommunityPost;