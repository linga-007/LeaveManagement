import { Html, Head, Body, Text, Button, Img } from '@react-email/components';

const PermissionEmailTemplate = ({ date, fromTime, toTime, permissionReason, userName, imageUrl, permissionId }) => (
  <Html>
    <Head />
    <Body style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f9f9f9' }}>
      <Img src={imageUrl} alt="Company Logo" style={{ width: '100px', marginBottom: '20px' }} />
      <h1 style={{ color: '#333', fontSize: '24px' }}>Permission Request from {userName}</h1>
      <Text style={{ color: '#555', fontSize: '16px', marginBottom: '20px' }}>
        Hi Manager,
      </Text>
      <Text style={{ color: '#555', fontSize: '16px', marginBottom: '20px' }}>
        You have received a new permission request. Please find the details below:
      </Text>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <tr>
          <td style={{ padding: '10px', backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Date:</td>
          <td style={{ padding: '10px', backgroundColor: '#fff' }}>{date}</td>
        </tr>
        <tr>
          <td style={{ padding: '10px', backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>From Time:</td>
          <td style={{ padding: '10px', backgroundColor: '#fff' }}>{fromTime}</td>
        </tr>
        <tr>
          <td style={{ padding: '10px', backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>To Time:</td>
          <td style={{ padding: '10px', backgroundColor: '#fff' }}>{toTime}</td>
        </tr>
        <tr>
          <td style={{ padding: '10px', backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Reason:</td>
          <td style={{ padding: '10px', backgroundColor: '#fff' }}>{permissionReason}</td>
        </tr>
      </table>
      <Text style={{ color: '#555', fontSize: '16px', marginBottom: '20px' }}>
        Kindly review and respond to this permission request.
      </Text>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          pX={20}
          pY={10}
          style={{ backgroundColor: '#28a745', color: '#fff', textDecoration: 'none', borderRadius: '5px', marginRight: '10px', padding: '10px' }}
          href={`http://localhost:5000/permission/accept/${permissionId}`}
        >
          Accept
        </Button>
        <Button
          pX={20}
          pY={10}
          style={{ backgroundColor: '#dc3545', color: '#fff', textDecoration: 'none', borderRadius: '5px', padding: '10px' }}
          href={`http://localhost:5000/permission/deny/${permissionId}`}
        >
          Decline
        </Button>
      </div>
    </Body>
  </Html>
);

export default PermissionEmailTemplate;
