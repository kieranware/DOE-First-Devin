# Employee Experience Platform Backend

This directory contains the backend implementation for the Employee Experience Platform. The backend will provide mock implementations of the following services:

## Services

1. **HCM System API**
   - Personal information management
   - Document retrieval
   - Payslip access

2. **API Router for OLCS Integration**
   - Request routing
   - Instance management
   - Multi-instance status

3. **Data Synchronization Service**
   - Synchronization across instances
   - Conflict resolution

## Project Structure

```
src/
├── services/     # Service implementations
├── routes/       # API route definitions
├── models/       # Data models
└── middleware/   # Middleware functions
```

## Implementation Notes

- All external API calls are mocked
- The backend will simulate the behavior of multiple HCM instances
- Authentication is mocked to simulate SSO
