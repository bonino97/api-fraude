import dotenv from 'dotenv';

dotenv.config();

export const linkTemplate = (email: string, url: string) => {
  const emailTemplate = {
    user: {
      email,
    },
    subject: ``,
    html: `
        <table style="background-color: #f6f7fb; width: 100%">
        <tbody>
          <tr>
            <td>
              <table style="width: 650px; margin: 0 auto; background-color: #fff; border-radius: 8px">
                <tbody>
                  <tr>
                    <td style="padding: 30px">
                    <h1 style="
                    font-family: Poppins, sans-serif;
                    color: ${'#000000'};
                    font-weight: bolder;
                    "> 
                    TITULO
                    </h1> 
                      <p style="font-family: Poppins, sans-serif;">Hey there!</p>
                      <p style="font-family: Poppins, sans-serif;">Thank you very much for your purchase, complete your order through this link below.</p>
                      <a href="${url}" style="font-family: Poppins, sans-serif; color: ${'#ffffff'}; text-decoration: none">${url}</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
            `,
  };

  return emailTemplate;
};
