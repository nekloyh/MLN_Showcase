# Political Economy Theory Web Game

Một ứng dụng web giáo dục tương tác về Kinh Tế Chính Trị Mác - Lênin, được xây dựng bằng React, TypeScript và Vite.

## Tính năng

- **Timeline tương tác**: Khám phá dòng thời gian lịch sử kinh tế chính trị từ Adam Smith đến Karl Marx
- **Mini Game**: Trò chơi tương tác với các tình huống kinh tế thực tế
- **Presentations**: Hiển thị báo cáo chi tiết về các lý thuyết kinh tế chính trị
- **Responsive Design**: Giao diện đẹp mắt với Tailwind CSS và Lucide icons

## Yêu cầu hệ thống

- Node.js (phiên bản 16 trở lên)
- npm hoặc yarn

## Cài đặt

1. Clone repository:

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Cài đặt dependencies:

   ```bash
   npm install
   ```

## Chạy ứng dụng

### Development mode

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### Build cho production

```bash
npm run build
```

### Preview build

```bash
npm run preview
```

## Scripts có sẵn

- `npm run dev` - Chạy development server
- `npm run build` - Build cho production
- `npm run preview` - Preview build production
- `npm run lint` - Kiểm tra linting
- `npm run typecheck` - Kiểm tra TypeScript

## Cấu trúc dự án

```text
src/
├── components/          # Các component UI
│   ├── ui/             # UI primitives (button, modal)
│   └── ...             # Các component chính
├── pages/              # Các trang chính
├── data/               # Dữ liệu JSON
├── content/            # Nội dung markdown
├── types/              # TypeScript types
└── lib/                # Utilities
```

## Công nghệ sử dụng

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool và dev server
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **React Markdown** - Render markdown
- **Lucide React** - Icons
- **Radix UI** - UI components

## Đóng góp

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## License

This project is private.
