import React, { useState } from 'react';
import VideoView from '@/components/videoview';
import WhyUs1_Mobile from '../../assets/whyus1_mobile.mp4';
import WhyUs1_web from '../../assets/whyus1_web.mp4';
import WhyUs2_Mobile from '../../assets/whyus2_mobile.mp4';
import WhyUs2_web from '../../assets/whyus2_web.mp4';

const WhyUs = () => {
    const [activeContent, setActiveContent] = useState('jobSeekers');

    return (
        <div>
            {/* Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <button
                    onClick={() => setActiveContent('jobSeekers')}
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        backgroundColor: activeContent === 'jobSeekers' ? '#007BFF' : 'grey',
                        color: activeContent === 'jobSeekers' ? '#fff' : 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    For Job Seekers
                </button>
                <button
                    onClick={() => setActiveContent('recruiters')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: activeContent === 'recruiters' ? '#007BFF' : 'grey',
                        color: activeContent === 'recruiters' ? '#fff' : 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    For Recruiters
                </button>
            </div>

            {/* Dynamic Content */}
            <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
                {activeContent === 'jobSeekers' && (
                    //   <p>Welcome Job Seekers! Explore opportunities and find your dream job here.</p>
                    <div>
                        <VideoView
                           bigVideo={WhyUs2_web}
                           smallVideo={WhyUs2_Mobile}
                        />
                    </div>
                )}
                {activeContent === 'recruiters' && (
                    <div>
                        <VideoView
                           bigVideo={WhyUs1_web}
                           smallVideo={WhyUs1_Mobile}
                        />
                    </div>                )}
            </div>
        </div>
    );
};

export default WhyUs;