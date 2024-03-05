import "./_banner.scss"

const Banner = () => {
    return (
        <section className={'banner'}>
            <div className={'banner-content'}>
                <h1 className={'title'}>Test assignment for front-end developer</h1>
                <p className={'banner-description'}>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
                <button className={'banner-button primary-button'}>Sign up</button>
            </div>
        </section>
    );
};

export default Banner;