
export interface SubtopicButton {
  title: string;
  subtitle?: string;
  url: string;
}

export interface Subtopic {
  name: string;
  buttons: SubtopicButton[];
}

export interface Topic {
  id: string;
  name: string;
  subtitle?: string;
  color: string;
  subtopics: Subtopic[];
}

export const dashboardTopics: Topic[] = [
  {
    id: "sales",
    name: "Vendas",
    subtitle: "Sales & Growth",
    color: "#69f0ae",
    subtopics: [
      {
        name: "Consolidado Vendas",
        buttons: [
          {
            title: "Vendas",
            subtitle: "Monthly Sales",
            url: "#"
          },
          {
            title: "CAC",
            subtitle: "Monthly CAC",
            url: "#"
          },
          {
            title: "LTV / CAC",
            subtitle: "Monthly LTV / CAC",
            url: "#"
          }
        ]
      },
      {
        name: "Por Canal",
        buttons: [
          {
            title: "B2C | Inside Sales",
            url: "#"
          },
          {
            title: "B2C | Brokers",
            url: "#"
          },
          {
            title: "B2B | Inside Sales",
            url: "#"
          },
          {
            title: "B2B | Brokers",
            url: "#"
          },
          {
            title: "Parceiras",
            subtitle: "Strategic Partners",
            url: "#"
          }
        ]
      },
      {
        name: "Aprofundamento",
        buttons: [
          {
            title: "Mídia Paga e Growth",
            subtitle: "Growth & Paid Media",
            url: "#"
          },
          {
            title: "Gestão Corretores",
            subtitle: "Brokers Management",
            url: "#"
          },
          {
            title: "Renovação B2B",
            subtitle: "B2B Price Renewal",
            url: "#"
          }
        ]
      },
      {
        name: "Metas",
        buttons: [
          {
            title: "Acomp. Diário",
            subtitle: "Daily Sales and Targets",
            url: "#"
          }
        ]
      }
    ]
  },
  {
    id: "revenue",
    name: "Receita",
    subtitle: "Revenues/Premium",
    color: "#69f0ae",
    subtopics: [
      {
        name: "Principal",
        buttons: [
          {
            title: "Membros",
            subtitle: "Members",
            url: "#"
          },
          {
            title: "Ticket Médio",
            subtitle: "Av. Ticket",
            url: "#"
          }
        ]
      }
    ]
  },
  {
    id: "claims",
    name: "Sinistro",
    subtitle: "Claims / Medical Loss",
    color: "#ff7373",
    subtopics: [
      {
        name: "Principal",
        buttons: [
          {
            title: "PMPM",
            subtitle: "ML per Capita",
            url: "#"
          },
          {
            title: "Sinistro %",
            subtitle: "MLR",
            url: "#"
          },
          {
            title: "Vida Sinistro",
            subtitle: "Claims Life",
            url: "#"
          }
        ]
      }
    ]
  },
  {
    id: "financial",
    name: "Financeiro",
    subtitle: "Financials",
    color: "#64b5f6",
    subtopics: [
      {
        name: "Principal",
        buttons: [
          {
            title: "Financials Dashboard",
            url: "#"
          }
        ]
      }
    ]
  },
  {
    id: "member",
    name: "Jornada do Membro",
    subtitle: "Member Journey",
    color: "#64b5f6",
    subtopics: [
      {
        name: "Care",
        buttons: [
          {
            title: "Time de Saúde",
            subtitle: "Care Team",
            url: "#"
          }
        ]
      },
      {
        name: "Experience",
        buttons: [
          {
            title: "Aplicativo",
            subtitle: "App Usage",
            url: "#"
          },
          {
            title: "Benefícios",
            subtitle: "Add Ons",
            url: "#"
          },
          {
            title: "Atendimento",
            subtitle: "Customer Support",
            url: "#"
          },
          {
            title: "Comunicação",
            subtitle: "Comms & CRM",
            url: "#"
          }
        ]
      }
    ]
  },
  {
    id: "product",
    name: "Produto",
    subtitle: "Product & App",
    color: "#ffab91",
    subtopics: [
      {
        name: "Principal",
        buttons: [
          {
            title: "Product Dashboard",
            url: "#"
          }
        ]
      }
    ]
  },
  {
    id: "tech",
    name: "Tech",
    color: "#ffab91",
    subtopics: [
      {
        name: "Principal",
        buttons: [
          {
            title: "Tech Dashboard",
            url: "#"
          }
        ]
      }
    ]
  },
  {
    id: "legal",
    name: "Jurídico",
    subtitle: "Legal",
    color: "#ce93d8",
    subtopics: [
      {
        name: "Principal",
        buttons: [
          {
            title: "Legal Dashboard",
            url: "#"
          }
        ]
      }
    ]
  },
  {
    id: "people",
    name: "People",
    subtitle: "Pessoas",
    color: "#ce93d8",
    subtopics: [
      {
        name: "Principal",
        buttons: [
          {
            title: "People Dashboard",
            url: "#"
          }
        ]
      }
    ]
  }
];
