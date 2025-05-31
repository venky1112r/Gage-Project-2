// import React from 'react';
// import logo from '../assets/logos/Cultura_Logo_Primary_LightBG.png';

// const EmailPreview = () => {
//   return (
//     <div style={{ padding: 40, backgroundColor: '#f0f2f5' }}>
//       <div
//         style={{
//           maxWidth: 620,
//           margin: '0 auto',
//           backgroundColor: '#ffffff',
//           borderRadius: 10,
//           boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//           fontFamily: 'Segoe UI, Arial, sans-serif',
//         }}
//       >
//         {/* Header */}
//         <div
//           style={{
//             backgroundColor: '#e6f0ec',
//             padding: '30px 20px 20px 20px',
//             borderTopLeftRadius: 10,
//             borderTopRightRadius: 10,
//             textAlign: 'center',
//           }}
//         >
//           <h1
//             style={{
//               color: '#003320',
//               fontWeight: '700',
//               fontSize: '2.5rem',
//               letterSpacing: '0.12em',
//               margin: 0,
//             }}
//           >
//             G.A.G.E.
//           </h1>
//           <p style={{ color: '#4f4f4f', marginTop: 10, fontSize: '0.95rem' }}>
//             Grown Above Ground Energy
//           </p>
//         </div>

//         {/* Body */}
//         <div style={{ padding: 30 }}>
//           <h2 style={{ color: '#222' }}>Hi John Doe,</h2>
//           <p style={{ lineHeight: 1.6, color: '#333' }}>
//             We’ve received a request to reset your password for your <strong>G.A.G.E.</strong> account.
//           </p>
//           <p style={{ lineHeight: 1.6, color: '#333' }}>
//             If you made this request, click the link below to proceed.
//           </p>


//           {/* Reset Link */}
//           <p style={{ marginTop: 10 }}>
//             <a
//               href="#"
//               style={{
//                 color: '#005e3f',
//                 fontWeight: 'bold',
//                 textDecoration: 'underline',
//               }}
//             >
//               Reset your password
//             </a>
//           </p>
//           <p style={{ lineHeight: 1.6, color: '#333', marginTop: 30 }}>
//             If you did not request a password reset, no action is required. This message was sent from a no-reply address (
//             <strong>noreply@gage.com</strong>).
//           </p>

//           {/* Disclaimer */}
//           <p style={{ fontSize: 14, lineHeight: 1.6, color: '#444', marginTop: 30, textAlign:'justify'}}>
//             <strong>CONFIDENTIALITY NOTICE:</strong> This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error, please notify the system manager. This message contains confidential information and is intended only for the individual named. If you are not the named addressee you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately by e-mail if you have received this e-mail by mistake and delete this e-mail from your system. If you are not the intended recipient you are notified that disclosing, copying, distributing or taking any action in reliance on the contents of this information is strictly prohibited.
//           </p>
//         </div>

//         {/* Footer */}
//         <div
//           style={{
//             backgroundColor: '#fafafa',
//             borderTop: '1px solid #e0e0e0',
//             padding: '20px 30px',
//             textAlign: 'center',
//             borderBottomLeftRadius: 10,
//             borderBottomRightRadius: 10,
//           }}
//         >
//           <p style={{ fontSize: 12, color: '#888', margin: 0 }}>
//             &copy; 2025 G.A.G.E. — Grown Above Ground Energy.
//           </p>
//           <div style={{ marginTop: 12 }}>
//             <img
//               src={logo}
//               alt="Cultura Logo"
//               style={{ height: 32, opacity: 0.9 }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmailPreview;


import React from 'react';
import logo from '../assets/logos/Cultura_Logo_Primary_LightBG.png';

const EmailPreview = () => {
  return (
    <div style={{ padding: 40, backgroundColor: '#eceff1' }}>
      <div
        style={{
          maxWidth: 640,
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          fontFamily: 'Segoe UI, Roboto, sans-serif',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #003320, #005e3f)',
            padding: '24px 20px',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              color: '#ffffff',
              fontSize: '2.8rem',
              fontWeight: 700,
              margin: 0,
              letterSpacing: '0.1em',
            }}
          >
            G.A.G.E.
          </h1>
          <p
            style={{
              color: '#d0e8dc',
              marginTop: 8,
              fontSize: '0.95rem',
              letterSpacing: '0.03em',
            }}
          >
            Grown Above Ground Energy
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '30px 30px 20px 30px' }}>
          <h2 style={{ color: '#2e2e2e', marginBottom: 12 }}>Hi John Doe,</h2>
          <p style={{ fontSize: 15, color: '#444', lineHeight: 1.6 }}>
            We’ve received a request to reset your password for your <strong>G.A.G.E.</strong> account.
          </p>
          <p style={{ fontSize: 15, color: '#444', lineHeight: 1.6 }}>
            If you made this request, use the button below to proceed.
          </p>

          {/* Reset Link Styled as Button */}
          <div style={{ marginTop: 30, textAlign: 'center' }}>
            <a
              href="#"
              style={{
                backgroundColor: '#005e3f',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: 6,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 14,
                display: 'inline-block',
              }}
            >
              Reset Your Password
            </a>
          </div>

          <p style={{ fontSize: 13, color: '#666', marginTop: 30 }}>
            If you did not request a password reset, no further action is required. This message was sent from a no-reply address (
            <strong>noreply@gage.com</strong>).
          </p>

          {/* Disclaimer */}
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: '#444',
              marginTop: 30,
              textAlign:'justify'
            }}
          >
            <strong>CONFIDENTIALITY NOTICE:</strong> This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error, please notify the system manager. This message contains confidential information and is intended only for the individual named. If you are not the named addressee you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately by e-mail if you have received this e-mail by mistake and delete this e-mail from your system. If you are not the intended recipient you are notified that disclosing, copying, distributing or taking any action in reliance on the contents of this information is strictly prohibited.
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            backgroundColor: '#f5f5f5',
            padding: '20px 30px',
            textAlign: 'center',
            borderTop: '1px solid #e0e0e0',
          }}
        >
          <p style={{ fontSize: 12, color: '#999', marginBottom: 10 }}>
            &copy; 2025 G.A.G.E. — Grown Above Ground Energy.
          </p>
          <img
            src={logo}
            alt="Cultura Logo"
            style={{ height: 28, opacity: 0.85 }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
