# dorayaki-factory-server

## Deskripsi Singkat Web Service

## Skema Basis Data

```
User {
    id: number;
    email: string;
    password: string;
    nama: string;
}
```

```
Request {
    id: number;
    ip: string;
    endpoint: string;
    id_dorayaki: number;
    stok: number;
    username: string;
    timestamp: Date;
    status: Status;
}
```

```
LogRequest {
    id: number;
    ip: string;
    endpoint: string;
    timestamp: Date;
}
```

```
BahanBaku {
    id: number;
    nama: string;
    stok: number;
}
```

```
Dorayaki = {
    id: number;
    nama: string;
    photo: string;
}
```

```

Bahan {
    jumlah: number;
    dorayakiId: number;
    bahanBakuId: number;
}

```

## Endpoint

### Autentikasi

- GET `/auth/me` --> `User`
- POST `/auth/login` --> `string`. Menerima `email` dan `password`
- POST `/auth/logout`
- POST `/auth/register`. Menerima `email` dan `password`
- GET `/auth/token` --> `string`

### Bahan

- GET `/bahan` --> BahanBaku[]
- POST `/bahan` --> BahanBaku. Menerima `nama` dan `stok`
- POST `/bahan/update`. Menerima `nama` dan `stok`

### Resep

- GET `/resep` --> Resep[]
- GET `/resep/:id` --> `{ id: number, nama: string, photo: string, bahan: { jumlah: number; bahanBaku: BahanBaku; }[]; }`

## Pembagian Tugas Anggota

- 13519143: Bahan dan Resep
- 13519163: Autentikasi
- 13519215: Request
