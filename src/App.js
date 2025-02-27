import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { jsPDF } from "jspdf";

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    experience: "",
    education: "",
  });

  const [resume, setResume] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResume("");

    try {
      const response = await fetch("http://localhost:5000/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResume(data.resume);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error generating resume:", error);
      alert("Failed to generate resume. Please try again.");
    }
  };

  // Function to Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Resume", 105, 20, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`Name: ${formData.name}`, 10, 40);
    doc.text(`Skills: ${formData.skills}`, 10, 50);
    doc.text(`Experience: ${formData.experience}`, 10, 60);
    doc.text(`Education: ${formData.education}`, 10, 70);

    doc.save("resume.pdf");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        padding: 4,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "15px",
          padding: 4,
          boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#0ff",
            textShadow: "0 0 10px #0ff",
          }}
        >
          AI Resume Builder
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            
            margin="normal"
            required
            InputProps={{
              sx: {
                borderRadius: "10px",
                
                input: { color: "#fff" },
                fieldset: { borderColor: "#0ff" },
                "&:hover fieldset": { borderColor: "#0ff" },
                "&.Mui-focused fieldset": { borderColor: "#0ff" },
              },
            }}
            InputLabelProps={{ sx: { color: "#0ff" } }}
          />
          <TextField
            label="Skills (comma separated)"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputProps={{
              sx: {
                borderRadius: "10px",
                input: { color: "#fff" },
                fieldset: { borderColor: "#0ff" },
                "&:hover fieldset": { borderColor: "#0ff" },
                "&.Mui-focused fieldset": { borderColor: "#0ff" },
              },
            }}
            InputLabelProps={{ sx: { color: "#0ff" } }}
          />
          <TextField
            label="Experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputProps={{
              sx: {
                borderRadius: "10px",
                input: { color: "#fff" },
                fieldset: { borderColor: "#0ff" },
                "&:hover fieldset": { borderColor: "#0ff" },
                "&.Mui-focused fieldset": { borderColor: "#0ff" },
              },
            }}
            InputLabelProps={{ sx: { color: "#0ff" } }}
          />
          <TextField
            label="Education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputProps={{
              sx: {
                borderRadius: "10px",
                input: { color: "#fff" },
                fieldset: { borderColor: "#0ff" },
                "&:hover fieldset": { borderColor: "#0ff" },
                "&.Mui-focused fieldset": { borderColor: "#0ff" },
              },
            }}
            InputLabelProps={{ sx: { color: "#0ff" } }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              width: "100%",
              backgroundColor: "#0ff",
              color: "#000",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#00e6e6",
                boxShadow: "0 0 15px #0ff",
              },
            }}
          >
            Generate Resume
          </Button>
        </form>

        {resume && (
          <Box
            mt={10}
            p={3}
            border={1}
            borderRadius={2}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderColor: "#0ff",
              color: "#fff",
              boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)",
            }}
          >
            <Typography variant="h6" sx={{ color: "#0ff" }}>
              Generated Resume:
            </Typography>
            <Typography variant="body1" whiteSpace="pre-line">
              {resume}
            </Typography>

            <Button
              onClick={downloadPDF}
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#0ff",
                color: "#000",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#00e6e6",
                  boxShadow: "0 0 15px #0ff",
                },
              }}
            >
              Download as PDF
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ResumeForm;
