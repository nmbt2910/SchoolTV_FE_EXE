import './CommunityPost.scss'; 
import { Avatar, Breadcrumb, Form, Input, Tooltip } from 'antd';
import { AntDesignOutlined, GlobalOutlined, HeartOutlined, MessageOutlined, SaveOutlined, SendOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import Carousel from '../../components/carousel/carousel';
import apiFetch from '../../config/baseAPI'; 
import { useState, useEffect } from 'react'; 

function CommunityPost() {
  const [posts, setPosts] = useState([]); 

  // Hàm lấy dữ liệu từ các refs
  const fetchDataByRef = async (refId) => {
    const response = await apiFetch(`/api/News/${refId}`);
    const data = await response.json();
    return data;  // Trả về dữ liệu
  };

  const processRefs = async (data) => {
    const updatedPosts = await Promise.all(data.$values.map(async (post) => {
      if (post.news?.$ref) {
        const newsData = await fetchDataByRef(post.news.$ref);
        post.news = newsData; 
      }
      
      if (post.schoolChannel?.$ref) {
        const schoolData = await fetchDataByRef(post.schoolChannel.$ref);
        post.schoolChannel = schoolData;  
      }

      if (post.categoryNews?.$ref) {
        const categoryData = await fetchDataByRef(post.categoryNews.$ref);
        post.categoryNews = categoryData;  
      }

      // Xử lý trường hợp hình ảnh
      if (post.newsPictures?.$values?.[0]?.fileData) {
        post.imageSrc = `data:${post.newsPictures.$values[0].contentType};base64,${post.newsPictures.$values[0].fileData}`;
      } else {
        post.imageSrc = "default-image.jpg";  
      }

      if (post.news?.news?.$ref) {
        const relatedNewsData = await fetchDataByRef(post.news.news.$ref);
        post.news.news = relatedNewsData;
      }

      return post;
    }));

    return updatedPosts;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiFetch('/api/News/combined');
        const data = await response.json();
        
        const postsWithRefs = await processRefs(data);
        setPosts(postsWithRefs); 
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchPosts();  
  }, []);  

  if (posts.length === 0) return <div>Loading...</div>;

  return (
    <div className="community-post-container">
      <div>
        <Carousel />
      </div>

      <div className="community-post-home">
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

      {posts.map((post, index) => (
        <div key={index} className="community-post-form">
          <Form>
            <div className="community-post-avatar">
              <Avatar size={50} icon={<UserOutlined />} />
              <div className="community-post-info">
                <a className="community-post-username">{post.schoolChannel?.name}</a>
                <a className="community-post-time">
                  {post.updatedAt ? new Date(post.updatedAt).toLocaleString() : 'Unknown Date'} <GlobalOutlined />
                </a>
              </div>
            </div>

            <div className="community-post-content">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <span className="community-post-hashtags">
                #{post.schoolChannel?.name || 'No Channel'} #FPTUniversity #CommunityPost
              </span>
            </div>

            <div className="community-post-image">
              {post.imageSrc ? (
                <img src={post.imageSrc} alt="Post" />
              ) : (
                <div>No image available</div> 
              )}
            </div>

            <div className="community-post-like">
              <HeartOutlined />
              <MessageOutlined />
              <SendOutlined />
              <SaveOutlined className="community-post-save" />
            </div>

            <div className="community-post-cmt-container">
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
                <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                <Tooltip title="Ant User" placement="top">
                  <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </Tooltip>
                <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
              </Avatar.Group>

              <span>Liked by <strong>phamtuananh</strong> and others</span>
            </div>

            <div className="community-post-view-cmt">
              <span>View all 22,300 comments</span>
            </div>      

            <div className="community-post-text-area">
              <Input 
                placeholder="Add a comment" 
                addonAfter={<SmileOutlined />}
              />
            </div>
          </Form>
        </div>
      ))}

      <div className="community-post-view-more">
        <a>View more</a>
      </div>
    </div>
  );
}

export default CommunityPost;
