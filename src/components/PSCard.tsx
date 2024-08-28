import { EditOutlined, SettingOutlined, EllipsisOutlined, DownOutlined, UserOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Card, Row, Col, Button, Dropdown, Space, MenuProps } from 'antd'
import Countdown, { CountdownProps } from 'antd/es/statistic/Countdown'
import dayjs from 'dayjs';
import React, { useState } from 'react'
import { addMinutesToCurrentTime } from '../helpers/addMinutesToTimer';



  const actions: React.ReactNode[] = [
    // <EditOutlined key="edit" />,
    // <SettingOutlined key="setting" />,
    // <EllipsisOutlined key="ellipsis" />,
  ];

const items: MenuProps['items'] = [
  {
    label: '15 минут',
    key: '1',
  },
  {
    label: '30 минут',
    key: '30',
  },
  {
    label: '1 час',
    key: '60',
  },
  {
    label: '2 часа',
    key: '120',
  },
  {
    type: 'divider',
  },
  {
    label: 'Уникальное время',
    key: '4',
    disabled: true,
  },
];
const PSCard = ({data}: any) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [timeEnd, setTimeEnd] = useState<boolean>(false); // таймер закончился или нет
    const [timerValue, setTimerValue] = useState<any>(0) // время таймера
    const [statusTimer, setStatusTimer] = useState<number>(0) // start / reset / need logic
    const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs()) // not use now
    const [abonement, setAbonement] = useState<{minutes: string, title: string
    }>({minutes: '60', title: '1 час'}) // время абонемента


    const startTimer = (gameTime: number) => {
      let now = dayjs()
      setStartTime(now)
      let time = addMinutesToCurrentTime(now, gameTime);
      setTimerValue(time)
    
      setTimeEnd(false)
      setStatusTimer(1)
    }

    const resetTime = () => {
      setTimerValue(0)

      setTimeEnd(false)
      setStatusTimer(0)
    }

    const onFinish: CountdownProps['onFinish'] = () => {
        console.log('finished!');
        setStatusTimer(0)
        setTimeEnd(true)
      };
      const handleMenuClick: MenuProps['onClick'] = (e) => {
        if(e.key === '30') setAbonement({minutes: e.key, title: '30 мин'}) 
        if(e.key === '1') setAbonement({minutes: e.key, title: '15 мин'})
        if(e.key === '60') setAbonement({minutes: e.key, title: '60 мин'})
        if(e.key === '120') setAbonement({minutes: e.key, title: '120 мин'})
      };
      const menuProps = {
        items,
        onClick: handleMenuClick,
      };
  return (
    <Card key={data.title} className={timeEnd ? 'timerEnd' : 'test_2'} loading={loading} actions={actions} style={{ minWidth: 300, maxWidth: 500, height: 250 }}>
        <Card.Meta
          title={data.title}
          description={
            <>
              <h2>Пользователь: {data.client.info}</h2>
              <Row style={{alignItems: 'center'}}>
              <h3 style={{margin: '3px', padding: '5px'}}>Абонемент: {abonement.title}.</h3>
              </Row>
              <Space wrap>
              <Dropdown.Button menu={menuProps} placement="bottom" icon={<FieldTimeOutlined />}>Изменить</Dropdown.Button>


              {statusTimer === 0 
               ?
                <Button size="middle" onClick={()=> startTimer(Number(abonement.minutes))}>Начать</Button>
              :
                <Button size="middle" onClick={resetTime}>Сбросить</Button>
              }
              </Space>
               {statusTimer === 1 || timeEnd === false ?
               <Row style={{alignItems: 'center'}}>
                  <h3>Осталось: </h3>
                  <Countdown title="" valueStyle={{fontSize: '16px', marginLeft: '5px'}} value={timerValue} onFinish={onFinish}/>
                </Row>
                : <></>
               }
              {timeEnd === true ? <h3>Время вышло</h3> : <></>}
              </>
          }
        />
    </Card>
  )
}

export default PSCard
