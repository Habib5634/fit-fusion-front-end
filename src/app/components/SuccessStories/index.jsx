'use client'
import Image from 'next/image';

const SuccessStories = () => {
  const stories = [
    {
     
      before: '/assets/before2.png',
      after: '/assets/after2.png',
      text: "Fit Fusion helped me lose 15 pounds & 6 inches of waist in five months, because of Fit Fusion I realized the importance of being fit and healthy.",
      name: "Mehak Ali"
    },
    {
        before: '/assets/before1.png',
        after: '/assets/after1.png',
      text: "Fit Fusion helped me lose 60 pounds & 10 inches of waist in three months! My nutritionist was amazing and gave me the guidance I needed.",
      name: "Malik Umair"
    },
    {
      before: '/assets/before3.png',
      after: '/assets/after3.png',
      text: "Fit Fusion changed my approach to nutrition, and I finally feel energized and healthy. Highly recommend!",
      name: "Neelam"
    }
  ];

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto py-16 lg:py-20 px-6 text-center font-serif">
        <h2 className="text-3xl font-bold text-yellow-600">Success Stories</h2>
        <p className="text-gray-600 mt-2">
          Testimonials from users who have successfully reached their fitness goals with the help of nutritionists.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-8 mt-8 px-4">
          {stories.map((story, index) => (
            <div key={index} className="bg-white border border-gray-300 rounded-xl shadow-lg p-6 text-center max-w-sm">
              <div className="flex justify-between">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-700">Before</h4>
                  <Image src={story.before} alt="Before" width={150} height={200} className="rounded-lg mx-auto hover:scale-105" />
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-700">After</h4>
                  <Image src={story.after} alt="After" width={150} height={200} className="rounded-lg mx-auto hover:scale-105" />
                </div>
              </div>
              <p className="text-gray-600 mt-4 italic">"{story.text}"</p>
              <p className="text-yellow-600 font-semibold mt-2">— {story.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
