const path = require("path");

module.exports = {
  mode: "development", // Puedes usar 'production' para producción
  entry: "./src/index.js", // El archivo principal de tu aplicación
  output: {
    path: path.resolve(__dirname, "dist"), // Directorio de salida
    filename: "bundle.js", // Nombre del archivo de salida
  },
  module: {
    rules: [
      // Regla para archivos JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader", // Usar Babel si deseas transpilar JS moderno
      },
      // Regla para archivos CSS
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      // Regla para imágenes
      {
        test: /\.(jpg|jpeg|png|gif|webp)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    open: true, // Abrir el navegador automáticamente al iniciar el servidor
  },
};
