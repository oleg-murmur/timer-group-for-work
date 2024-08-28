import { EditOutlined, SettingOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Card, Row, Col } from 'antd'
import Countdown, { CountdownProps } from 'antd/es/statistic/Countdown'
import React, { useState } from 'react'
const deadline = Date.now() + 1 * 10 * 6 * 24 * 2 + 1000 * 30; // Dayjs is also OK



  const actions: React.ReactNode[] = [
    <EditOutlined key="edit" />,
    <SettingOutlined key="setting" />,
    <EllipsisOutlined key="ellipsis" />,
  ];
const PSCard = ({data}: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [timeEnd, setTimeEnd] = useState<boolean>(false);

    const onFinish: CountdownProps['onFinish'] = () => {
        console.log('finished!');
        setTimeEnd(true)
      };
  return (
    <Card key={data.title} className='test_2' loading={loading} actions={actions} style={{ minWidth: 300 }}>
        <Card.Meta
          // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
          title={data.title}
          description={
            <>
              <p>Абонемент: {data.abonement}</p>
               <span>Осталось: </span>
               {timeEnd === false ?
               <Row gutter={16}>
                <Col span={12}>
                    <Countdown title="" value={deadline} onFinish={onFinish} />
                </Col>
                </Row>
                :
               <>
               <div>время вышло</div>
                <Row gutter={16}>
                <Col span={12}>
                    <Countdown title="" value={deadline} onFinish={onFinish} />
                </Col>
                </Row>
               </>
               }
              </>
          }
        />
    </Card>
  )
}

export default PSCard
