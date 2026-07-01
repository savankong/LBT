import type { Metadata } from 'next'
import BookEarlyAccessForm from '@/components/BookEarlyAccessForm'

export const metadata: Metadata = {
  title: 'The LBT Book',
  description: 'The Life Between Titles book. Coming soon. A book for everyone who has ever sat in the middle part of a career transition and wondered if they were going to be okay.',
  alternates: { canonical: 'https://www.lifebetweentitles.com/book' },
}

export default function BookPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <div className="page-header-inner">
            <span className="label">Coming Soon</span>
            <h1>The LBT Book</h1>
            <p>The next chapter of Life Between Titles. A book for everyone who has ever sat in the middle part and wondered if they were going to be okay.</p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center'}}>
            <div>
              <span className="label">About the Book</span>
              <h2 style={{marginBottom:24}}>Titles are temporary.<br /><em>Identity is not.</em></h2>
              <p style={{marginBottom:18,fontSize:'1.02rem',lineHeight:1.82}}>The Life Between Titles book is a natural extension of the conversations we&apos;ve been having since October 2025. An exploration of what it really means to lose a title, and what&apos;s possible when you stop letting one define you.</p>
              <p style={{marginBottom:18,fontSize:'1.02rem',lineHeight:1.82}}>Drawing from dozens of honest conversations with people who have lived through layoffs, career pivots, burnout, and reinvention, the book will go deeper than any single episode can.</p>
              <p style={{fontStyle:'italic',fontSize:'1.15rem',color:'var(--terra)',lineHeight:1.55}}>More details coming soon. Sign up below to be the first to know when it&apos;s available.</p>
              <div style={{marginTop:36}}>
                <BookEarlyAccessForm />
              </div>
            </div>
            <div style={{borderRadius:24,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',padding:32}}>
              <img src="/ebook.png" alt="Life Between Titles Book" style={{width:'100%',maxWidth:400,height:'auto',display:'block'}} />
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
