import { SlideData } from '../types';

export const SLIDES_DATA: SlideData[] = [
  // SLIDE 1 — INTRODUCTION
  {
    id: 1,
    number: "01",
    category: "FONDATION",
    title: "Le Repository Pattern",
    subtitle: "Séparation nette entre logique métier et persistance des données",
    definition: "Le Repository Pattern sépare la logique métier de la logique d'accès aux données grâce à une abstraction.",
    diagram: {
      type: 'abstraction',
    },
    points: [
      {
        title: "Séparation des responsabilités",
        description: "Le domaine métier reste totalement agnostique des détails techniques de stockage.",
        icon: "Layers",
        badge: "SRP"
      },
      {
        title: "Faible couplage & Inversion",
        description: "Le métier dialogue avec une interface abstraite, jamais avec une base concrète.",
        icon: "Unplug",
        badge: "DIP"
      },
      {
        title: "Centralisation de l'accès",
        description: "Point d'entrée unique pour la récupération et la persistance des entités.",
        icon: "Target",
        badge: "Cohérence"
      },
      {
        title: "Testabilité & Flexibilité",
        description: "Remplacement immédiat par des fakes en mémoire pour les tests unitaires rapides.",
        icon: "CheckCircle2",
        badge: "Tests"
      }
    ],
    speakerNotes: "Présenter le rôle clé du pattern dans une architecture hexagonale ou DDD : isoler les règles de gestion hôtelière de l'infrastructure de stockage.",
    tags: ["DDD", "Architecture", "Design Pattern", "Clean Code"]
  },

  // SLIDE 2 — RÔLE DU REPOSITORY
  {
    id: 2,
    number: "02",
    category: "RESPONSABILITÉ",
    title: "Rôle du Repository",
    subtitle: "Une collection d'objets métier en mémoire simulée",
    definition: "Le Repository se comporte comme une collection en mémoire : il encapsule le stockage, la recherche et l'accès sans exposer la plomberie SQL ou réseau.",
    keyMessage: "Service → logique métier | Repository → accès aux données",
    points: [
      {
        title: "Opérations Fondamentales (CRUD)",
        description: "Create → save() · Read → findById(), findAll() · Update → save()/update() · Delete → delete()",
        icon: "Database",
        badge: "Cycle de vie"
      },
      {
        title: "Recherche orientée Domaine",
        description: "Méthodes expressives calquées sur le langage métier (findByEmail, findAvailableRooms).",
        icon: "Search",
        badge: "Requêtes"
      },
      {
        title: "Abstraction totale de la source",
        description: "L'appelant ignore si les données proviennent d'une table SQL, d'un document ou d'une API.",
        icon: "ShieldCheck",
        badge: "Isolation"
      }
    ],
    codeSnippets: [
      {
        title: "Exemple Java — Contrat ClientRepository",
        code: `// Interface expressive orientée domaine métier
public interface ClientRepository {
    void save(Client client);
    Client findById(UUID id);
    List<Client> findAll();
    Client findByEmail(String email);
    void delete(UUID id);
}`
      }
    ],
    speakerNotes: "Souligner que le Repository manipule des agrégats / entités du domaine (Client) et non des lignes de tables (Data Rows / DTO).",
    tags: ["CRUD", "Domaine", "Contrat"]
  },

  // SLIDE 3 — ARCHITECTURE
  {
    id: 3,
    number: "03",
    category: "ARCHITECTURE EN COUCHES",
    title: "Architecture & Découplage",
    subtitle: "Flux de contrôle unidirectionnel et inversion des dépendances",
    keyMessage: "Le Service dépend du contrat Repository, pas d'une implémentation concrète.",
    diagram: {
      type: 'architecture',
    },
    points: [
      {
        title: "Controller (Exposition)",
        description: "Reçoit les requêtes HTTP, valide le format d'entrée et délègue au Service.",
        badge: "Entrée"
      },
      {
        title: "Service (Logique Métier)",
        description: "Orchestre les règles : vérification de disponibilité, calcul du tarif, validation.",
        badge: "Cœur"
      },
      {
        title: "Repository (Contrat de Données)",
        description: "Définit les opérations d'accès sans impliquer de technologie particulière.",
        badge: "Abstraction"
      },
      {
        title: "Data Source (Stockage)",
        description: "Infrastructure physique : base relationnelle (PostgreSQL), NoSQL ou mémoire.",
        badge: "Infra"
      }
    ],
    codeSnippets: [
      {
        title: "Java — Injection de Dépendance par Constructeur",
        code: `public class ReservationService {
    private final ReservationRepository repository;

    // Injection via le contrat d'interface
    public ReservationService(ReservationRepository repository) {
        this.repository = repository;
    }

    public void confirmerReservation(UUID reservationId) {
        // Le service ne sait pas où ni comment les données sont stockées
        Reservation reservation = repository.findById(reservationId);
        reservation.confirmer();
        repository.save(reservation);
    }
}`
      }
    ],
    speakerNotes: "L'inversion de dépendance garantit que le domaine métier (Service) ne dépend jamais de l'infrastructure externe.",
    tags: ["Inversion de contrôle", "Couplage faible", "Clean Architecture"]
  },

  // SLIDE 4 — IMPLÉMENTATION
  {
    id: 4,
    number: "04",
    category: "IMPLÉMENTATION JAVA",
    title: "Implémentation : Contrat vs Concrétisation",
    subtitle: "L'interface définit le QUOI, la classe concrète définit le COMMENT",
    diagram: {
      type: 'contract',
    },
    points: [
      {
        title: "Interface = LE QUOI",
        description: "Définit les capacités offertes au domaine métier sans aucune fuite technique.",
        badge: "WHAT"
      },
      {
        title: "Implémentation = LE COMMENT",
        description: "Porte le code technique spécifique au support (Map en mémoire, JPA, JDBC).",
        badge: "HOW"
      }
    ],
    codeSnippets: [
      {
        title: "Interface — WHAT",
        code: `public interface ClientRepository {
    void save(Client client);
    Client findById(UUID id);
    List<Client> findAll();
    void update(Client client);
    void delete(UUID id);
}`
      },
      {
        title: "Implémentation — HOW (In-Memory)",
        code: `public class InMemoryClientRepository implements ClientRepository {
    private final Map<UUID, Client> clients = new HashMap<>();

    @Override
    public void save(Client client) {
        clients.put(client.getId(), client);
    }

    @Override
    public Client findById(UUID id) {
        return clients.get(id);
    }
}`
      }
    ],
    speakerNotes: "Expliquer pourquoi l'implémentation InMemory est précieuse pour les tests d'intégration rapides et le prototypage.",
    tags: ["Java", "Interface", "Polymorphisme"]
  },

  // SLIDE 5 — GENERICS + OPTIONAL
  {
    id: 5,
    number: "05",
    category: "IDIOMES MODERNES",
    title: "Génériques & Optional en Java",
    subtitle: "Contrats réutilisables et sécurité face à l'absence de donnée",
    points: [
      {
        title: "Généricité : Repository<T, ID>",
        description: "T représente l'Entité métier, ID son type d'identifiant unique (UUID, Long, Integer).",
        badge: "DRY & Typage fort"
      },
      {
        title: "Déclinaisons hôtelières",
        description: "Repository<Client, UUID> · Repository<Room, Integer> · Repository<Reservation, UUID>",
        badge: "Modèle Domaine"
      },
      {
        title: "Optional<T> : Absence explicite",
        description: "Élimine les redoutés NullPointerException en forçant l'appelant à traiter l'absence de valeur.",
        badge: "Null-Safety"
      }
    ],
    codeSnippets: [
      {
        title: "Interface Générique de Base",
        code: `public interface Repository<T, ID> {
    void save(T entity);
    Optional<T> findById(ID id);
    List<T> findAll();
    void deleteById(ID id);
}`
      },
      {
        title: "Usage avec Optional en Java",
        code: `// Signature sécurisée
Optional<Client> findById(UUID id);

// Consommation côté Service
Client client = clientRepository.findById(clientId)
    .orElseThrow(() -> new ClientNotFoundException(clientId));`
      }
    ],
    speakerNotes: "Insister sur le fait qu'Optional ne doit être utilisé qu'en valeur de retour de méthode, jamais en paramètre ou champ de classe.",
    tags: ["Java 8+", "Generics", "Optional", "Type Safety"]
  },

  // SLIDE 6 — REPOSITORY VS DAO VS SERVICE
  {
    id: 6,
    number: "06",
    category: "DISTINCTION CONCEPTUELLE",
    title: "Repository vs DAO vs Service",
    subtitle: "Clarifier les responsabilités pour éviter la confusion des rôles",
    keyMessage: "DAO et Repository peuvent se chevaucher selon l'architecture. Le DAO reste optionnel.",
    comparisonTable: [
      {
        aspect: "Rôle Fondamental",
        dao: "Accès technique aux données (table SQL, procédure, JDBC).",
        repository: "Émulation d'une collection en mémoire d'entités de domaine.",
        service: "Orchestration des cas d'usage et règles de gestion métier."
      },
      {
        aspect: "Question Clé",
        dao: "\"Comment accéder techniquement aux données ?\"",
        repository: "\"Comment l'application manipule ses entités ?\"",
        service: "\"Que doit accomplir l'application métier ?\""
      },
      {
        aspect: "Vocabulaire type",
        dao: "ResultSet, SQL, Connection, RowMapper, executeUpdate",
        repository: "save(), findById(), findAll(), findActiveReservations()",
        service: "validerDisponibilite(), calculerTarif(), reserverChambre()"
      }
    ],
    codeSnippets: [
      {
        title: "Exemple de Service Orchestrateur",
        code: `public class ReservationService {
    public void createReservation(ReservationRequest req) {
        // 1. Validation métier
        req.validate();
        // 2. Vérification disponibilité
        if (!roomRepository.isAvailable(req.getRoomId(), req.getDates())) {
            throw new RoomUnavailableException();
        }
        // 3. Calcul du prix
        BigDecimal prix = pricingEngine.calculer(req);
        // 4. Persistance via Repository
        repository.save(new Reservation(req, prix));
    }
}`
      }
    ],
    speakerNotes: "Le DAO est centré table/données brutes. Le Repository est centré agrégat du domaine. Le Service est le chef d'orchestre.",
    tags: ["Architecture", "Comparatif", "DAO", "Service"]
  },

  // SLIDE 7 — BONNES PRATIQUES + PIÈGES
  {
    id: 7,
    number: "07",
    category: "RECOMMANDATIONS",
    title: "Bonnes Pratiques & Pièges Fréquents",
    subtitle: "Règles d'or pour préserver la maintenabilité de la base de code",
    diagram: {
      type: 'dip',
    },
    bestPractices: [
      {
        title: "Dépendre des Interfaces",
        description: "Toujours injecter `ReservationRepository` et jamais `InMemoryReservationRepository`.",
        badge: "DIP"
      },
      {
        title: "Respect strict du SRP",
        description: "Le Service applique les règles métier ; le Repository ne fait qu'accéder aux données.",
        badge: "SRP"
      },
      {
        title: "Testabilité immédiate",
        description: "Facilite l'usage de mocks (Mockito) ou d'implémentations mémoires dans les tests sans lancer de base SQL.",
        badge: "Tests unitaires"
      }
    ],
    pitfalls: [
      {
        title: "Logique métier dans le Repository",
        description: "Calculs de prix, contrôles de validité ou transitions d'état n'ont rien à faire dans le Repository.",
        badge: "Anti-pattern"
      },
      {
        title: "Repository 'Fourre-Tout' (God Repository)",
        description: "Créer un repository géant au lieu d'un repository dédié par racine d'agrégat.",
        badge: "Couplage fort"
      },
      {
        title: "Abstraction inutile / Fuite technique",
        description: "Exposer des objets techniques (SQLException, ResultSet) ou des requêtes trop spécifiques.",
        badge: "Fuite d'abstraction"
      }
    ],
    speakerNotes: "Dans un projet DDD, seuls les agrégats racines (Aggregate Roots) possèdent un Repository, pas chaque table de la BDD.",
    tags: ["SOLID", "Best Practices", "Code Smells"]
  },

  // SLIDE 8 — CONCLUSION
  {
    id: 8,
    number: "08",
    category: "SYNTHÈSE",
    title: "Conclusion & Synthèse",
    subtitle: "Les 5 piliers du Repository Pattern en Java",
    keyMessage: "\"Le Service décide quoi faire. Le Repository gère l'accès aux données.\"",
    diagram: {
      type: 'recap',
    },
    points: [
      {
        title: "1. Séparation",
        description: "Frontière étanche entre la logique pure de votre application et les détails de persistance.",
        icon: "Split",
        badge: "Clarté"
      },
      {
        title: "2. Abstraction",
        description: "Simulation d'une collection d'objets métier sans contraintes d'infrastructure.",
        icon: "Shield",
        badge: "Contrat"
      },
      {
        title: "3. Faible Couplage",
        description: "Le code applicatif ne connaît ni SQL, ni JDBC, ni dialecte de base de données.",
        icon: "Unlink",
        badge: "Indépendance"
      },
      {
        title: "4. Testabilité",
        description: "Tests unitaires ultra-rapides grâce aux fakes en mémoire et mocks sans conteneur.",
        icon: "Zap",
        badge: "Vélocité"
      },
      {
        title: "5. Flexibilité",
        description: "Migration ou changement de base de données sans impacter la moindre règle métier.",
        icon: "Sliders",
        badge: "Évolutivité"
      }
    ],
    speakerNotes: "Conclure sur l'impact de ce pattern sur la longévité et la maintenabilité d'une application d'entreprise Java.",
    tags: ["Synthèse", "Key Takeaways", "Java Developer"]
  }
];
