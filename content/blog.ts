export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content: string[]
  relatedBrainstorm?: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'new-york',
    title: 'New York.',
    excerpt:
      'To me, New York has never been a city. It has never been just New York; it has always been more. For a while, I could not figure out what drew me so strongly to such a city.',
    content: [
      'To me, New York has never been a city. It\'s never been just New York; it has always been more.',
      'To me, it was New York.',
      'For a while, I couldn\'t figure out what drew me strongly to such a city. I was from the suburbs of North Carolina and was blessed with a charming Southern childhood. To my ex-boyfriend, New York felt like the opposite of this life, almost appalling.',
      'I have been told by many people that I would hate it there and quickly move back.',
      'But, I would like to at least be given the chance to hate it first.',
      'I am not sure where this obsession first started, to be honest. Maybe it was Sex in the City, with their heels and endless friendships, or even Sesame Street.',
      'Although I am very partial to Charlotte, I do believe it was Elmo that must have subconsciously set the trajectory of my own ambitions onto New York.',
      'I suppose this idea of endless opportunities and possibilities of finding lifelong friends there has swayed me, too.',
      'I think to me, New York meant freedom. The city gives off American dreams and independence, if anything. So, New York meant being me.',
      'I want nothing more than to be able to live in a small 1-bedroom apartment on the West End with only one window and the ability to reach my arms out and touch both walls.',
      'This childhood dream of mine pushed me to my career today. It was not a conscious thought of, oh, what job gets me to New York, but maybe an underlying idea of what I wanted in life.',
      'I want to live so much in this life. They talk about a New York minute as if it transcends all laws of physics. A minute in New York is different, it\'s expensive, time is money, and money is spent fast. In a single moment, people are bustling, trading millions, and rushing to events that create memories that last a lifetime.',
      'This is the life I want.',
      'To be a part of a living, breathing city. Something greater than just myself.',
      'The goal was always New York. But the city was always more. It means being able to say I did it. It means I am chasing my dreams, and I am striving for a life where I get to experience culture on every corner and meet people brought together by the same ambitions I hold.',
    ],
  },
  {
    slug: 'kue-nastar',
    title: 'Kue Nastar on the Long Table',
    excerpt:
      'Pineapple tart cookies, referred to as "Kue Nastar" by my family, are my favorite Chinese New Year treat. Golden brown cookies on a long table, red all around to ward off bad spirits. It is known as a celebration, but it is often a complicated holiday for me.',
    content: [
      'Pineapple tart cookies, referred to as "Kue Nastar" by my family, are my favorite Chinese New Year treat. It\'s a time of auspicious celebration as the plate of golden brown cookies is carefully laid out on a long table, around which the people are wearing red to ward off bad spirits. It\'s known as a celebration, but it is often a complicated holiday for me.',
      'I am dressed head to toe in red and gold, and even my underwear is red to bring me good luck and fortune for the following year. Despite seemingly blending into the crowd, I am an imposter, just like the nastar cookies are. Pineapple cookies prepared in that manner aren\'t traditionally Chinese, but neither am I; like me, it originated in the Chinese community of Indonesia.',
      'My parents grew up in Indonesia because their Chinese ancestors believed it would bring them more economic prosperity, but it was a country fighting to improve. This drive for survival is what drove my parents to the ever-enticing American Dream. At first, I thought it was just an overused cliche that drove immigrants here, but I realized I owe my life to the American Dream. The idea my parents fell in love with pushed them to pursue an education in the States.',
      'I stare at the nastar, wondering if it looks out of place to the others. At Chinese restaurants, they try to speak to my family in Mandarin first. We awkwardly respond in English and another attendant is brought to us instead. We whisper about it in Indonesian, trying to laugh off the repeated experience. Although I can speak fluently and understand the Indonesian language, my American accent still gives me away.',
      'I realize I should not be ashamed of my accent because I am an American. I am proud to be American because this country represents how endless cultures can come together to create one nation full of diversity. I am grateful for that as I enjoy meeting new people and genuinely love listening to others\' stories. It is important to me that the people in my life are heard. I accept that my accent is heard and reveals a part of my identity.',
      'I realized these cookies were a part of my identity too. The nastar cookies are something I bake with my mom, a tradition unique to my family. I remember smoothing out cracks in the dough as I complained about not feeling like I belonged. My mom was the one who encouraged me to create places where I felt like I did belong. She knew before I did that I belonged here.',
      'I did take her advice in creating a place where I felt like I belonged. I started getting out of my comfort zone as I realized I wanted to be remembered as a positive force. I shamelessly started greeting people and participating in my school by starting and joining organizations. I met people here who helped me realize that a person\'s identity was not something that could be labeled and condensed into a few words or on a plate. It was what they did and why.',
      'I learned that the languages I speak or don\'t speak, or even what I look like, don\'t define where I belong. I learned that it is possible to create your own welcoming environment that undermines labeled boxes to check off. I want to continue this sense of community and look forward to many people\'s lives who will cross paths with mine.',
      'Finally, I was displaying the cookies proudly as I felt like I had given myself the confidence I needed. My family\'s pineapple cookies belonged at the long table of celebratory foods as there is often a quick motion of hands fighting for a piece. These cookies brought people together, a gift that I share with this good-luck treat.',
    ],
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
