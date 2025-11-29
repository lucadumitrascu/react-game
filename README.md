<div id="top" align="center">
<h1>React Game</h1>
<h3>React - Redux</h3>
<img src="/images/player.png" alt="player" title="player">
</div>

<h2>Summary</h2>
<p>This is a 2D game built with React and Redux, where the player explores a series of maps, completes quests, and confronts enemies to advance.</p>
<p>Redux manages the game state, keeping it centralized and consistent.</p>
<p>SweetAlert2 and React-Toastify handle modals and notifications.</p>
<p>Custom hooks and utility functions modularize the code, making it maintainable and reusable.</p>

<h2>Features</h2>
<ul>
  <li><strong>Maps</strong>
    <ul>
      <li>The game includes five distinct 10×10 grid maps accessible through doors.</li>
      <li>Each map contains obstacles (inaccessible tiles).</li>
      <li>Doors include opening and closing animations and remain locked until all enemies on the current map are defeated.</li>
      <li>Each map represents a level with increasing difficulty, enemy count, and enemy strength.</li>
    </ul>
  </li>

  <li><strong>Player</strong>
    <ul>
      <li>Player character features smooth animated movement on the map with keyboard and on-screen button controls.</li>
      <li>Player starts with 5 HP and 1 STR, which can be increased by completing quests.</li>
    </ul>
  </li>

  <li><strong>Enemies</strong>
    <ul>
      <li>Enemies move randomly within map boundaries with smooth animations.</li>
      <li>Each enemy starts with 5 HP and 1 STR, which increase by 5 HP and 1 STR per level.</li>
      <li>The number of enemies increases by 1 on each new level.</li>
    </ul>
  </li>

  <li><strong>Combat System</strong>
    <ul>
      <li>Combat occurs when the player and an enemy occupy the same tile.</li>
      <li>The player can attack or defend when the corresponding button and card are highlighted.</li>
      <li>Each attack deals randomized damage based on character strength.</li>
      <li>Winning or losing triggers a modal with options to continue or restart the game.</li>
    </ul>
  </li>

  <li><strong>Ghost NPC</strong>
    <ul>
      <li>Ghost NPC appears to provide intro and outro dialogues.</li>
      <li>Dialogues are triggered when the player is near and all enemies on the map are defeated.</li>
    </ul>
  </li>

  <li><strong>Quests</strong>
    <ul>
      <li>Quests are tracked in a dedicated section.</li>
      <li>Completing a quest triggers a toast notification and rewards the player with additional health or strength.</li>
    </ul>
  </li>

  <li><strong>Stats Section</strong>
    <ul>
      <li>Displays player and enemy stats, including HP and STR.</li>
      <li>Shows the player’s current position (X, Y) on the map.</li>
    </ul>
  </li>
</ul>

<h2>Screenshots</h2>
<img src="/images/map1.png" alt="map1" title="map1">
<img src="/images/ghost_intro_dialogue1.png" alt="ghost_intro_dialogue1" title="ghost_intro_dialogue1">
<img src="/images/ghost_intro_dialogue2.png" alt="ghost_intro_dialogue2" title="ghost_intro_dialogue2">
<img src="/images/ghost_intro_dialogue3.png" alt="ghost_intro_dialogue3" title="ghost_intro_dialogue3">
<img src="/images/combat1.png" alt="combat1" title="combat1">
<img src="/images/combat2.png" alt="combat2" title="combat2">
<img src="/images/map2.png" alt="map2" title="map2">
<img src="/images/map3.png" alt="map3" title="map3">
<img src="/images/map4.png" alt="map4" title="map4">
<img src="/images/map5.png" alt="map5" title="map5">
<img src="/images/ghost_outro_dialogue1.png" alt="ghost_outro_dialogue1" title="ghost_outro_dialogue1">
<img src="/images/ghost_outro_dialogue2.png" alt="ghost_outro_dialogue2" title="ghost_outro_dialogue2">
<img src="/images/end_of_game_modal.png" alt="end_of_game_modal" title="end_of_game_modal">
<img src="/images/winning_combat_modal.png" alt="winning_combat_modal" title="winning_combat_modal">
<img src="/images/losing_combat_modal.png" alt="losing_combat_modal" title="losing_combat_modal">

<p align="right"><a href="#top">(Back to top)</a></p>
