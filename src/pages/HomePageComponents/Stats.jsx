 import stats from '../../data/stats'

  export default function Stats() {
    return (
      <div className="py-14 sm:py-12  border-dashed border border-[#173a96] border-2 rounded-2xl mt-10 container max-md:w-[80%]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base/7 text-gray-800">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl text-[#173a96]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    )
  }
  