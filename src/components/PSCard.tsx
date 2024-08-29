import { FieldTimeOutlined } from '@ant-design/icons';
import { Card, Row, Button, Dropdown, Space, MenuProps, Select, InputNumber } from 'antd'
import Countdown, { CountdownProps } from 'antd/es/statistic/Countdown'
import dayjs from 'dayjs';
import { useState } from 'react'
import { addMinutesToCurrentTime } from '../helpers/addMinutesToTimer';

const TIME_TO_ASSEMBLE = 15

const items: MenuProps['items'] = [
  {
    label: '1 час',
    key: '1',
  },
  {
    label: '2 часа',
    key: '120',
  },
  {
    label: '3 часа',
    key: '180',
  },
  {
    label: '4 часа',
    key: '240',
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
    const [endTimerValue, setEndTimerValue] = useState<any>(0) // время таймера

    const [statusTimer, setStatusTimer] = useState<number>(0) // start / reset / need logic
    const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs()) // not use now
    const [playerCount, setPlayerCount] = useState<number>(1)
    const [abonement, setAbonement] = useState<{minutes: string, title: string
    }>() // время абонемента


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
    const onChange = (value: any) => {
      console.log(`selected ${value}`);
      setPlayerCount(value)

    };
    const onFinish: CountdownProps['onFinish'] = () => {
        console.log('finished!');
        setStatusTimer(0)
        setTimeEnd(true)
        const now = dayjs()
        let time = addMinutesToCurrentTime(now, TIME_TO_ASSEMBLE);
        setEndTimerValue(time)
      };
      const handleMenuClick: MenuProps['onClick'] = (e) => {
        if(e.key === '1') setAbonement({minutes: e.key, title: '1 час'}) 
        if(e.key === '120') setAbonement({minutes: e.key, title: '2 часа'})
        if(e.key === '180') setAbonement({minutes: e.key, title: '3 часа'})
        if(e.key === '240') setAbonement({minutes: e.key, title: '4 часа'})
      };
      const menuProps = {
        items,
        onClick: handleMenuClick,
      };
  return (
    <Card key={data.title} className={timeEnd ? 'timerEnd' : 'test_2'} loading={loading} style={{ minWidth: 450, width: 500, height: 250 }}>
        <Card.Meta
          title={`${data.title}`}
          description={
            !timeEnd ?
            <>
            <Space wrap>
            <h3>Количество игроков:</h3>
            <InputNumber min={1} max={4} disabled={statusTimer ? true : false} onChange={onChange} defaultValue={1} variant="filled" style={{ width: 50 }} />
            </Space>
              <h3 style={{}}>Оплаченное время: {abonement?.title ?? 'Не выставлено'}.</h3>
              <Space wrap>
              <Dropdown.Button menu={menuProps} placement="bottom" icon={<FieldTimeOutlined />}>Изменить</Dropdown.Button>
              {statusTimer === 0 
               ?
                <Button size="middle" disabled={abonement ? false : true} onClick={()=> startTimer(Number(abonement?.minutes))}>Начать</Button>
              :
                <Button size="middle" onClick={resetTime}>Сбросить</Button>
              }
              </Space>
               {statusTimer === 1 ?
               <Row style={{alignItems: 'center'}}>
                  <h3>Осталось: </h3>
                  <Countdown title="" valueStyle={{fontSize: '16px', marginLeft: '5px'}} value={timerValue} onFinish={onFinish}/>
                </Row>
                : <></>
               }
              </>
              : 
              <>
              {timeEnd === true ? <div style={{display: 'flex', justifyContent: 'center',alignItems: 'center', flexDirection: 'column',fontSize: '18px'}}>
              <h2>Время вышло</h2>
              <Space wrap >
                <div>Осталось:</div>
                  <Countdown title="" valueStyle={{fontSize: '16px', marginLeft: '5px'}} value={endTimerValue}/>
          </Space>
                </div> : <></>}

                <Space wrap >
                <Button className={timeEnd ? 'timerEnd' : 'test_2'} size="middle" onClick={resetTime}>Завершить</Button>
                <h3>Время на завершение: {TIME_TO_ASSEMBLE} минут</h3>
                </Space>
              </>
          }
        />
    </Card>
  )
}

export default PSCard
