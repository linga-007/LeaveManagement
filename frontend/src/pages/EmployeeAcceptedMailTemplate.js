import { Html, Head, Body, Text, Button, Img } from '@react-email/components';

const LeaveAcceptedEmailTemplate = ({ userName, leaveType, fromDate, toDate, leaveReason, imageUrl, leaveId, numberOfDays }) => (
  <Html>
    <Head />
    <Body style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f9f9f9' }}>
      <Img src={imageUrl} alt="Company Logo" style={{ width: '100px', marginBottom: '20px' }} />
      <h1 style={{ color: '#333', fontSize: '24px' }}>Leave Request Approved</h1>
      <Text style={{ color: '#555', fontSize: '16px', marginBottom: '20px' }}>
        Dear {userName},
      </Text>
      <Text style={{ color: '#555', fontSize: '16px', marginBottom: '20px' }}>
        We are pleased to inform you that your leave request has been approved. Below are the details:
      </Text>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <tr>
          <td style={{ padding: '10px', backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Leave Type:</td>
          <td style={{ padding: '10px', backgroundColor: '#fff' }}>{leaveType}</td>
        </tr>
        <tr>
          <td style={{ padding: '10px', backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>From Date:</td>
          <td style={{ padding: '10px', backgroundColor: '#fff' }}>{fromDate}</td>
        </tr>
        <tr>
          <td style={{ padding: '10px', backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>To Date:</td>
          <td style={{ padding: '10px', backgroundColor: '#fff' }}>{toDate}</td>
        </tr>
        <tr>
          <td style={{ padding: '10px', backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Number of Days:</td>
          <td style={{ padding: '10px', backgroundColor: '#fff' }}>{numberOfDays} days</td>
        </tr>
        <tr>
          <td style={{ padding: '10px', backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Reason for Leave:</td>
          <td style={{ padding: '10px', backgroundColor: '#fff' }}>{leaveReason}</td>
        </tr>
      </table>
      <Text style={{ color: '#555', fontSize: '16px', marginBottom: '20px' }}>
        Please ensure you plan your tasks accordingly before your leave. If you have any questions, feel free to reach out.
      </Text>
      <Button
        pX={20}
        pY={10}
        style={{ backgroundColor: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '5px', padding: '10px' }}
        href={`http://localhost:5000/leave/details/${leaveId}`}
      >
        View Leave Details
      </Button>
    </Body>
  </Html>
);

export default LeaveAcceptedEmailTemplate;
