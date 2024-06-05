import Marquee from 'react-fast-marquee'
const Latest = () => {
  return (
    <div className="mt-20 flex mx-4 lg:mx-0">
      <p className="px-3 py-2 rounded-md text-white bg-red-600">Latest</p>
      <Marquee speed={140} className="text-red-600 text-[15px] font-normal">
        Breaking News: Market hits all-time high...... Sports Update: Local team
        wins championship...... Weather Alert: Heavy rain expected this
        weekend...... Politics: New bill passed in parliament...... Health: Tips
        for staying healthy during the flu season......
      </Marquee>
    </div>
  )
}

export default Latest
