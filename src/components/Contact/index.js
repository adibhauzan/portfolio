import React, { useRef, useState } from 'react'; // Import useState
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
@media (max-width: 960px) {
    padding: 0px;
}
`

const Wrapper = styled.div`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
max-width: 1350px;
padding: 0px 0px 80px 0px;
gap: 12px;
@media (max-width: 960px) {
    flex-direction: column;
}
`

const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
      margin-top: 12px;
      font-size: 32px;
  }
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;


const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -moz-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -webkit-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
`



const Contact = () => {
  (function(){
    emailjs.init("tYWTLGimYlzOgx5ih"); 
})();
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
          await emailjs.sendForm('service_8b06xdf', 'template_umcag38', form.current
              // from_email: form.current.from_email.value,
              // from_subject: form.current.subject.value,
              // from_name: form.current.from_name.value,
              // message: form.current.message.value
          );

          Swal.fire({
              title: "Success!",
              text: "Your message has been sent successfully.",
              icon: "success"
          });
      } catch (error) {
          Swal.fire({
              title: "Error!",
              text: "Failed to send message. Please try again later.",
              icon: "error"
          });
          console.error("Error sending email:", error);
      } finally {
          setLoading(false);
          // form.current.reset();
      }
  };

  return (
      <Container>
          <Wrapper>
              <Title>Contact</Title>
              <Desc>Feel free to reach out to us for any questions or opportunities!</Desc>
              <ContactForm ref={form} onSubmit={handleSubmit}>
                  <ContactTitle>Email Us 🚀</ContactTitle>
                  <ContactInput type="text" name="from_name" placeholder="Your Name" required />
                  <ContactInput type="email" name="from_email" placeholder="Your Email" required />
                  <ContactInput type="text" name="subject" placeholder="Subject" required />
                  <ContactInputMessage name="message" placeholder="Your Message" rows="4" required />
                  <ContactButton type="submit" value="Send" disabled={loading} />
              </ContactForm>
          </Wrapper>
      </Container>
  );
};

export default Contact