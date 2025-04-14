import  posts  from '../../data/blogs';
// Removed motion and SlideUp imports

export default function Blogs() {
  return (
    <div className="py-0 sm:py-0 mb-10 mt-20 max-sm:mt-0">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-0 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-0 sm:pt-0 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
              <img
                alt=""
                src={post.author.imageUrl}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="flex items-center gap-x-4 text-xs mt-4">
                <time
                  dateTime={post.datetime}
                  className="text-gray-500"
                >
                  {post.date}
                </time>
                <a
                  href={post.href}
                  target='_blank'
                  rel='noreferrer'
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.category.title}
                </a>
              </div>
              <div className="group relative">
                <h3
                  className="mt-3 text-lg/6 font-semibold text-gray-800 group-hover:text-gray-400"
                >
                  <a href={post.href} target='_blank' rel='noreferrer'>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p
                  className="mt-5 line-clamp-3 text-sm/6 text-gray-600"
                >
                  {post.description}
                </p>
              </div>
              <div className="relative mt-4 flex items-center justify-between w-full">
                <p
                  className="font-semibold text-gray-500"
                >
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.author.name}
                  </a>
                </p>
                <a
                  href={post.href}
                  target='_blank'
                  rel='noreferrer'
                >
                  <div className="inline-block px-4 py-2 text-sm font-medium text-gray-800 border border-white bg-white rounded-md hover:text-white hover:border-[#98cd05] hover:bg-[#98cd05] transition-colors duration-300">
                    Read More
                  </div>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}