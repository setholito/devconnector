import React from 'react'

function Hero({ children }) {
    return (
        <section className="hero is-dark">
            <div className="hero-body">
                <div className="container has-text-centered">{children}</div>
            </div>
        </section>
    )
}

export default Hero
