# Solución al Error de Carga del Perfil

## 🔍 Problema
El perfil del usuario no carga y muestra un mensaje de error.

## ✅ Soluciones Implementadas

### 1. **Mejor Manejo de Errores**
- ✅ Mensajes de error más descriptivos
- ✅ Detección específica de errores 401 (sesión expirada), 404 (perfil no encontrado)
- ✅ Logs en consola para debugging
- ✅ Botón "Reintentar" para volver a intentar cargar el perfil

### 2. **Uso de Proxy de Vite**
- ✅ Las peticiones ahora usan rutas relativas (`/api/user/profile`)
- ✅ Vite redirige automáticamente a `http://localhost:8080`
- ✅ Evita problemas de CORS

### 3. **Mensajes de Error Mejorados**
El sistema ahora muestra mensajes específicos según el tipo de error:
- **401**: "Sesión expirada. Por favor, inicia sesión nuevamente."
- **404**: "Perfil no encontrado."
- **Conexión**: "Error de conexión. Verifica que el servidor esté activo en http://localhost:8080"

## 🚀 Pasos para Verificar

### 1. Verificar que el Backend esté Corriendo
```bash
cd Backend-Quarkus
./mvnw quarkus:dev
```

El backend debe estar corriendo en `http://localhost:8080`

### 2. Verificar que el Frontend esté Corriendo
```bash
cd Frontend-React
npm run dev
```

El frontend debe estar corriendo en `http://localhost:5173`

### 3. Iniciar Sesión
1. Ve a `http://localhost:5173/login`
2. Inicia sesión con un usuario válido
3. El sistema guardará el token en localStorage

### 4. Acceder al Perfil
1. Ve a `http://localhost:5173/profile`
2. O haz clic en tu avatar en el header → "Editar perfil"

## 🔧 Debugging

### Ver Logs en la Consola del Navegador
Abre las DevTools (F12) y ve a la pestaña Console. Verás:
```
Fetching profile with token: eyJhbGciOiJSUzI1NiI...
Response status: 200
Profile data: { id: 1, username: "...", ... }
```

### Errores Comunes

#### Error: "Error de conexión. Verifica que el servidor esté activo"
**Causa**: El backend no está corriendo
**Solución**: Inicia el backend con `./mvnw quarkus:dev`

#### Error: "Sesión expirada"
**Causa**: El token JWT ha expirado
**Solución**: Vuelve a iniciar sesión

#### Error: "Perfil no encontrado"
**Causa**: El usuario no existe en la base de datos
**Solución**: Verifica que el usuario esté registrado correctamente

## 📋 Checklist de Verificación

- [ ] Backend corriendo en puerto 8080
- [ ] Frontend corriendo en puerto 5173
- [ ] Base de datos MySQL activa
- [ ] Usuario registrado en el sistema
- [ ] Token válido en localStorage
- [ ] CORS configurado correctamente en el backend

## 🔐 Verificar Token

Abre la consola del navegador y ejecuta:
```javascript
localStorage.getItem("token")
```

Si devuelve `null`, necesitas iniciar sesión nuevamente.

## 📝 Notas Adicionales

- El perfil ahora es de **solo lectura** (no se puede editar)
- Muestra: username, email, teléfono, rol, fecha de registro y última actualización
- El botón "Reintentar" permite volver a intentar cargar el perfil sin recargar la página
