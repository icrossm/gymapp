export const navigation = [
  {
    text: "AnaSayfa",
    path: "/home",
    icon: "home",
  },
  {
    text: "Üye İşlemleri",
    icon: "folder",
    items: [
      {
        text: "Üyeler",
        path: "/customer",
      },
      {
        text: "Üye Harcamaları",
        path: "/customer-expense",
      },
      {
        text: "Üye Ödemeleri",
        path: "/customer-payment",
      },
      {
        text: "Üye Borçları",
        path: "/customer-debit",
      },
      {
        text: "Gruplar",
        path: "/groups",
      },
      {
        text: "Üye Gelişimi",
        path: "/customer-track",
      },
      {
        text: "Üye Puanlama",
        path: "/customer-rating",
      },
    ],
  },
  {
    text: "Salon İşlemleri",
    icon: "folder",
    items: [
      {
        text: "Hizmetler",
        path: "/services",
      },
      {
        text: "Eğitmenler",
        path: "/trainers",
      },
      {
        text: "Ürünler",
        path: "/products",
      },
    ],
  },
  {
    text: "Randevular",
    icon: "folder",
    items: [
      {
        text: "Tüm Dersler",
        path: "/appointments",
      },
      {
        text: "Eğitmene Göre Dersler",
        path: "/app-by-trainers",
      },
      {
        text: 'Gruplara Göre Dersler',
        path: '/app-by-group',
      },
      {
        text: 'Ders Analizleri',
        path: '/app-analysis', 
      }
    ],
  }
];
