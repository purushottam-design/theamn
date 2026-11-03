const data={
 index:['Aman — The Aman Life | AI Creator, Producer & Entrepreneur','Explore the creative world of Aman: AI, films, music, stories, technology, companies and global collaborations.'],
 work:['Creative Work — Aman | AI, Film, Music & Stories','Discover eleven areas of creative practice, from AI imagery and prompt design to films, songs, books and visual storytelling.'],
 tech:['Tech Launch — Aman | AI Products, Apps & Platforms','Explore live technology platforms and upcoming launches across AI, prompt libraries, mobile applications and gaming.'],
 companies:['Companies, Brands & Platforms — Aman','Explore and search eleven companies and platforms across technology, creative production, investment, social impact and commerce.'],
 invest:['Invest with Aman — The Aman Life','Discover the missions and upcoming plans of Aman’s ventures, and connect about business partnerships.'],
 collaborate:['Collaborate with Aman — Brands, AI, Music & Film','Connect about brand partnerships, AI projects, music, films, campaigns, applications and business collaborations.'],
 art:['Art & AI — Aman, Digital AI Artist & Songwriter','Explore digital AI art, visual storytelling, paintings, songwriting and notes from the creative studio.'],
 music:['Music & Stories — Aman, Songwriter and Storyteller','Original songs, albums, music videos and spoken stories in development. Discover what is on the way.'],
 achievements:['Achievements & Journey — Aman','Follow Aman’s creative journey, upcoming launches and future confirmed milestones.']
};
export function applyMetadata(document,page){
 const [title,description]=data[page];
 const url='https://theamanlife.com/'+(page==='index'?'':page);
 document.title=title;
 document.querySelector('meta[name="theme-color"]').content='#090909';
 const set=(selector,attributes)=>{let element=document.querySelector(selector);if(!element){element=document.createElement(selector.startsWith('link')?'link':'meta');document.head.append(element)}for(const [key,value]of Object.entries(attributes))element.setAttribute(key,value)};
 set('meta[name="description"]',{name:'description',content:description});
 set('link[rel="canonical"]',{rel:'canonical',href:url});
 for(const [property,content] of Object.entries({'og:title':title,'og:description':description,'og:type':'website','og:url':url,'og:image':'https://theamanlife.com/assets/images/aman-moon-1.webp'}))set('meta[property="'+property+'"]',{property,content});
 set('meta[name="twitter:card"]',{name:'twitter:card',content:'summary_large_image'});
}
