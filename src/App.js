import React from 'react'
import './App.css';
import Dashboard from './components/Dashboard/Dashboard'
import ListMusic from './components/ListMusic/ListMusic'

function App() {
    
    const songs = [
      {
          name: 'Why not me',
          singer: 'Enrique Iglesias',
          path: './assest/music/WhyNotMe.mp3',
          image: './assest/images/whynotme.jpg',
      },
      {
          name: 'That girl',
          singer: 'Olly Murs',
          path: './assest/music/ThatGirl.mp3',
          image: './assest/images/thatgirl.jpg',
      },
      {
          name: 'Monster',
          singer: 'Katie Sky',
          path: './assest/music/Monster.mp3',
          image: './assest/images/monster.jpg',
      },
      {
          name: 'Trouble is a friend',
          singer: 'Lenka',
          path: './assest/music/TroubleIsAFriend.mp3',
          image: './assest/images/troubleisfriend.jpg',
      },
      {
          name: 'Cheri Cheri Lady',
          singer: 'Modern Talking',
          path: './assest/music/CheriCheriLady-ModernTalking.mp3',
          image: './assest/images/chericherilady.jpg',
      },
      {
          name: 'Sold Out',
          singer: 'Hawk Nelson',
          path: './assest/music/Sold Out - Hawk Nelson.mp3',
          image: './assest/images/soldout.jpg',
      },
      {
          name: 'Until You',
          singer: 'Shayne Ward',
          path: './assest/music/UntilYou-ShayneWard.mp3',
          image: './assest/images/untilyou.jpg',
      },
      {
          name: 'Lemon Tree',
          singer: 'FoolsGarden',
          path: './assest/music/LemonTree-FoolsGarden.mp3',
          image: './assest/images/lemontree.jpg',
      },
      {
          name: 'Daskness',
          singer: 'Eminem',
          path: './assest/music/Darkness-Eminem.mp3',
          image: './assest/images/daskness.jpg',
      },
      {
          name: 'Paind My Dues',
          singer: 'NF',
          path: './assest/music/PaidMyDues.mp3',
          image: './assest/images/paidMyDues.png',
      },
    ]

    return (
        <div className="App">
            <Dashboard songs={songs}/>
            <ListMusic songs={songs}/>
        </div>
    );
}

export default App;
