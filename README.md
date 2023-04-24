# Dự án Gear3S Shop - website bán Gear 3 miền
## Chức năng chính của dự án 
** Về phía người dùng (User) ** 
- Đăng nhập , đăng kí tài khoản vào nền tảng 
- Xem toàn bộ các sản phẩm có trong hệ thống :
    + Có phân trang
    + Sort (sắp xếp) theo từng thuộc tính sản phẩm
    + Filter nâng cao theo từng thuộc tính sản phẩm
    + Tìm kiếm sản phẩm theo từ khoá 
- Xem chi tiết từng sản phẩm:
    + Thông tin chi tiết của từng sản phẩm 
    + Xem ảnh theo slider của sản phẩm 
    + Có chức năng thêm sản phẩm vào giỏ hàng / chức năng mua ngay 
- Xem giỏ hàng:
    + Chức năng giỏ hàng với các hàng hoá có dự định là sẽ mua (yêu cầu đăng nhập vào)
- Xem đơn hàng:
    + Mua các sản phẩm được thêm vào giỏ hàng (yêu cầu đăng nhập vào)
    + Thêm , giảm số lượng sản phẩm , tính tổng giá tiền từng sản phẩm và gửi đơn hàng (yêu cầu đăng nhập vào)
    + Mua hàng, thanh toán hàng với paypal (yêu cầu đăng nhập vào)
- Quản lý profile khách hàng: 
    + Upload thông tin cá nhân (ảnh, tên, ngày sinh , ...) (yêu cầu đăng nhập vào)
    + Đổi mật khẩu người dùng (yêu cầu đăng nhập vào)
    + Xem tình trạng của đơn hàng (yêu cầu đăng nhập vào)
    + Sử dụng authen token để quản lí phiên đăng nhập
## Cài đặt, phát triển dự án 
- Công nghệ sử dụng 
    + UI / CSS Library: Tailwindcss + HeadlessUI
    + State Management: React Query cho async state và React Context cho state thường
    + Form Management: React Hook Form
    + Routing - navigation: React Router 
    + API: Axios
    + Build tool - deploy: Vite / Pm2 / Docker 
    + Hỗ trợ đa ngôn ngữ với react.i18next

- Cài đặt các công nghệ
    1. ESLint / prettier
    ```bash
    yarn add eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-prettier prettier-plugin-tailwindcss eslint-plugin-react-hooks -D
    ```
    2. React TS 
    ```bash
    yarn create vite
    ```
    Sau đó điền / chọn project react framework.
    3. Tailwind CSS
    ```bash
    yarn add -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```
    4. Pm2
    - Cài đặt pm2
    ```bash
    npm i pm2
    ```
    - Chạy project web bằng pm2
    ```
    pm2 start 'ng serve --host 0.0.0.0 --port 3000' --name 'Gear3S-ui'
    ```
    - Build file docker / run dockerfile 
    ```
    FROM adoptopenjdk/openjdk11
    WORKDIR /iot-backend-phase3-swapAPI
    COPY . .
    CMD ["java", "-jar", "swapapi.jar"]
    EXPOSE 8080
    ```
    ```
    docker build . -t gear3s-ui
    docker run -d --rm -p 3000:3000 --name gear3s-ui gear3s-ui
    ```
    5. Cài đặt yarn
    ```
    npm i yarn
    ```
- Chạy thông thường 
    ```
    "dev": "vite / yarn dev",
    "build": "tsc && vite build",
    "preview": "vite preview",
    ```

## Cấu trúc project của dự án 
- Kiến trúc của project
    ![gear3s](https://i.ibb.co/5rWBVC5/gear3s-drawio.png)

## Server triển khai

    ```
    http://103.160.2.183:3000/
    ```

