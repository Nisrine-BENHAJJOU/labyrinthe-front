"use client";
import { useState } from 'react';

const sections = [
  
  { id: 'overview', title: 'Description Technique', content: `

<h2 class="text-2xl font-semibold mt-6 text-orange-700">1. Aperçu</h2>
<p>Ce projet est une application basée sur un labyrinthe utilisant un backend en C++ (framework Crow) et un frontend en React. Le frontend interagit avec le backend via des requêtes HTTP pour récupérer des données. L'architecture assure une communication fluide entre le client et le serveur tout en maintenant évolutivité et efficacité.</p>

<h2 class="text-2xl font-semibold mt-6 text-orange-700">2. Technologies Utilisées</h2>

<h3 class="text-xl font-semibold mt-6 text-blue-800">Backend (C++)</h3>
<ul>
  <li><strong>Framework Crow :</strong> Utilisé pour mettre en place un serveur web léger pour gérer les requêtes API. Il simplifie la gestion des routes et des réponses HTTP en C++.</li>
  <li><strong>Bibliothèque Standard C++ :</strong> Utilisée pour le traitement des données et l'implémentation de la logique métier.</li>
  <li><strong>Multithreading :</strong> Assure un traitement efficace des requêtes, évitant les goulets d'étranglement.</li>
  <li><strong>Gestion JSON :</strong> Les réponses sont formatées en JSON pour une communication facile avec le frontend.</li>
  <li><strong>Configuration CORS :</strong> Permet les requêtes cross-origin depuis le frontend.</li>
</ul>

<h3 class="text-xl font-semibold mt-6 text-blue-800">Frontend (React + TypeScript)</h3>
<ul>
  <li><strong>React :</strong> Fournit une interface utilisateur dynamique et interactive.</li>
  <li><strong>TypeScript :</strong> Améliore la qualité du code avec le typage statique.</li>
  <li><strong>Fetch API :</strong> Utilisé pour effectuer des requêtes HTTP vers le backend C++.</li>
  <li><strong>React Hooks :</strong> Gère le cycle de vie des composants et la gestion d'état.</li>
</ul>

<h2 class="text-2xl font-semibold mt-6 text-orange-700">3. Architecture & Approche</h2>

<h3 class="text-xl font-semibold mt-6 text-blue-800">Communication Client-Serveur</h3>
<p>- Le frontend React effectue des appels API en utilisant Fetch API pour interagir avec le backend C++.</p>
<p>- Le backend Crow traite les requêtes, effectue la logique nécessaire et renvoie des réponses JSON.</p>
<p>- Le frontend met à jour dynamiquement l'UI en fonction des données récupérées.</p>

<h2 class="text-2xl font-semibold italic mt-6 text-orange-700">Pourquoi ces choix ?</h2>
<ul style="list-style-type:disc">
  <li><strong>Framework Crow (C++) :</strong> Choisi pour sa légèreté et son efficacité dans la gestion des requêtes HTTP avec un minimum de surcharge.</li>
  <li><strong>React (TypeScript) :</strong> Fournit une structure d'UI basée sur des composants, rendant l'application évolutive et maintenable.</li>
  <li><strong>Fetch API :</strong> Natif à JavaScript, pas besoin de dépendances externes comme Axios.</li>
  <li><strong>JSON :</strong> Assure un échange de données facile entre le backend et le frontend.</li>
  <li><strong>Configuration CORS :</strong> Nécessaire pour permettre les requêtes du frontend vers le backend fonctionnant sur un port différent.</li>
</ul>
    `},
  { id: 'ui', title: 'Interface utilisateur (Usage)', content: `
    <h2 class="text-2xl font-semibold italic mt-6 text-orange-700">1. Première vue de la plateforme</h2>
    <p>
      Dans cette vue initiale, l'utilisateur découvre la grille du labyrinthe. L'interface est claire et colorée pour faciliter l'interaction.
    </p>
    <ul>
      <li><strong>Description des couleurs des nodes :</strong>
        <ul style="list-style-type:disc"  class="ml-8">
          <li><strong>Blanc</strong> : Nœuds non visités</li>
          <li><strong>Bleu</strong> : Nœuds visités pendant le traitement</li>
          <li><strong>Jaune</strong> : Nœuds du chemin trouvé, s'il existe</li>
          <li><strong>Noir</strong> : Murs/obstacles ajoutés par l'utilisateur</li>
        </ul>
      </li>
      <li><strong>Sélection de l'algorithme :</strong> L'utilisateur peut choisir entre BFS (Breadth-First Search) ou Dijkstra pour résoudre le labyrinthe.</li>
      <li><strong>Bouton d'informations :</strong> Un bouton permet d'accéder à cette page courante pour plus d'informations sur le projet.</li>
    </ul>
    <img src="CE1.png" alt="Vue initiale de la plateforme">
    
    <h2 class="text-2xl font-semibold italic mt-6 text-orange-700">2. Après la sélection des nœuds "Start", "End", et "Walls", et clic sur "Launch"</h2>
    <p>
      Une fois les nœuds "Start" et "End" définis et les murs ajoutés, l'utilisateur peut lancer le processus de recherche en cliquant sur le bouton <strong>"Launch"</strong>.
    </p>
    <ul>
      <li><strong>Vert</strong> : Nœud "Start"</li>
      <li><strong>Rouge</strong> : Nœud "End"</li>
      <li><strong>Noir</strong> : Murs ajoutés à la grille</li>
    </ul>
    <img src="CE2.png" alt="Après la sélection des nodes et clic sur Launch">

    <h2 class="text-2xl font-semibold italic mt-6 text-orange-700">3. Visualisation pendant le traitement</h2>
    <p>
      Lors de l'exécution de l'algorithme, les nœuds sont explorés et colorés pour indiquer ceux qui ont été visités.
    </p>
    <ul>
      <li><strong>Bleu</strong> : Nœuds visités, indiquant les étapes de l'algorithme.</li>
    </ul>
    <img src="CE3.png" alt="Visualisation pendant le traitement">

    <h2 class="text-2xl font-semibold italic mt-6 text-orange-700">4. Résultat final avec le chemin trouvé</h2>
    <p>
      Une fois l'algorithme terminé, le chemin le plus court est visualisé en <strong>jaune</strong>, s'il existe.
    </p>
    <ul>
      <li><strong>Options de réinitialisation et de modification :</strong>
        <ul>
          <li><strong>Bouton "Clear"</strong> : Réinitialise la grille pour repartir de zéro.</li>
          <li><strong>Ajouter des murs</strong> : L'utilisateur peut ajouter de nouveaux murs pour changer le labyrinthe, <b>sans devoir</b> repartir de zéro.</li>
          <li><strong>Changer "Start" et "End"</strong> : Permet de déplacer les nœuds de départ et d'arrivée pour expérimenter avec différentes configurations.</li>
        </ul>
      </li>
    </ul>
    <img src="CE4.png" alt="Résultat final avec le chemin trouvé">
    `

    
  }
];

  

export default function InfoPage() {
  const [activeSection, setActiveSection] = useState(sections[0].id);


return (
  <div className="flex min-h-screen">
    {/* Sidebar */}
    <nav className="fixed w-64 bg-gray-900 text-white p-4 h-full">
      <ul className='h-full'>
        {sections.map((section) => (
          <li key={section.id}>
            <button
              className={`w-full text-left p-2 hover:bg-gray-700 ${
                activeSection === section.id ? 'bg-gray-700' : ''
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.title}
            </button>
          </li>
        ))}
        <li className='mt-2'><button
          className={`p-2 m-2 text-white font-extrabold rounded-lg bg-cyan-700 hover:bg-orange-700`}
          onClick={() => {
            window.location.href = "http://localhost:3000";
          }}
        >
          Aller au Labyrinthe
        </button></li>
      </ul>
    </nav>
    {/* Content */}
    <main className="ml-64 flex-1 p-6 overflow-auto text-gray-950">
      {sections.map((section) => (
        section.id === activeSection && (
          <div key={section.id}>
            <h1 className="text-3xl font-bold mb-4">{section.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: section.content }} className="text-lg" />
          </div>
        )
      ))}
    </main>
  </div>

);
}
