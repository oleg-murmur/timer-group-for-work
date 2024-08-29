import { EditOutlined, SettingOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Flex, Switch, Card, Avatar, Row, Col } from 'antd'
import Countdown, { CountdownProps } from 'antd/es/statistic/Countdown'
import React, { useState } from 'react'
import PSCard from './PSCard';
import { addMinutesToCurrentTime } from '../helpers/addMinutesToTimer';

const dataCard = [
  {
    title: 'PS 5_01',
    abonement: '2 часа',
    client: {
      info: "имя 1",
      count: 1
    },
    time: 100
  },
  {
    title: 'PS 5_02',
    abonement: '1 час',
    client: {
      info: "имя 1",
      count: 2
    },
    time: 2
  },
  {
    title: 'PS 5_03',
    abonement: '30 мин',
    client: {
      info: "имя 1",
      count: 3
    },
    time: 45
  },
  {
    title: 'PS 5_04',
    abonement: '1 час',
    client: {
      info: "имя 1",
      count: 4
    },
        time: 1
  },
]

const actions: React.ReactNode[] = [
    <EditOutlined key="edit" />,
    <SettingOutlined key="setting" />,
    <EllipsisOutlined key="ellipsis" />,
  ];
  
  const onChange: CountdownProps['onChange'] = (val) => {
    if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
      console.log('changed!');
    }
  };
const CardPS: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

  return (
    <Flex align="start" wrap gap="middle">
    {/* <Switch checked={!loading} onChange={(checked) => setLoading(!checked)} /> */}
      {dataCard.map((data): any => (
        <PSCard key={data.title} data={data}/>
      ))}
  </Flex>
  )
}
export default CardPS;