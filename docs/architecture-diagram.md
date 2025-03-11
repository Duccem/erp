# Architecture Diagram

## Resumen

La arquitectura del proyecto se divide en cuatro capas principales:

1. **Application Layer**: Contiene la lógica principal de la aplicación y los casos de uso.
2. **Domain Layer**: Define las entidades, objetos de valor y repositorios.
3. **Infrastructure Layer**: Maneja el acceso a la base de datos y servicios externos.
4. **UI Layer**: Incluye los componentes de la interfaz de usuario, páginas, tiendas, hooks y contextos de React.

Cada capa interactúa con las otras de manera específica para mantener una separación clara de responsabilidades y facilitar el mantenimiento y la escalabilidad del proyecto.

```mermaid
graph TD
    A[Application Layer] -->|Uses| B[Domain Layer]
    B -->|Interacts with| C[Infrastructure Layer]
    A -->|Renders| D[UI Layer]
    subgraph Application Layer
        A1[Main Application Logic]
        A2[Use Cases]
    end
    subgraph Domain Layer
        B1[Entities]
        B2[Value Objects]
        B3[Repositories]
    end
    subgraph Infrastructure Layer
        C1[Database Access]
        C2[External Services]
    end
    subgraph UI Layer
        D1[Components]
        D2[Pages]
        D3[Stores]
        D4[Hooks]
        D5[React Context]
    end
    subgraph src
        E1[modules]
        E2[lib]
        E3[app]
        E4[assets]
    end
    E1 -->|Contains| F1[category]
    E1 -->|Contains| F2[warehouse]
    E2 -->|Contains| G1[actions]
    E2 -->|Contains| G2[database]
    E2 -->|Contains| G3[env]
    E2 -->|Contains| G4[ui]
    E3 -->|Contains| H1[auth]
    E3 -->|Contains| H2[main]
    E4 -->|Contains| I1[globals.css]
```

## Estructura de carpetas

```
src/
├── lib/
│   ├── actions/
│   ├── database/
│   ├── env/
│   └── ui/
└── modules/
    ├── category/
    │   ├── application/
    │   ├── domain/
    │   ├── infrastructure/
    │   └── ui/
    └── warehouse/
        ├── application/
        ├── domain/
        ├── infrastructure/
        └── ui/
```
