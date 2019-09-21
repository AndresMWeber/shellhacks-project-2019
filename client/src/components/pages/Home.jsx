import React from 'react'

export default function Home() {
  return (
    <div className="map"></div>
    <div className="modal zipcode">
      <form>
        <label for="zipCode">Enter your zipcode, address or allow OURNAME access to your location.</label>
        <input type="text" name="zipCode"></input>
      </form>
    </div>
    <section>
      <nav>This is where the future navigation will go</nav>
    </section>
  )
}
