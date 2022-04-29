using System.ComponentModel.DataAnnotations;


namespace UrnaEFCore.Entities
{
    public class Candidate
    {
        [Required]
        [Key]
        public int Id { get; set; }

        [Required]
        public string? FullName { get; set; }

        [Required]
        public string? ViceCandidateName { get; set; }

        [Required]
        public DateTime RegistryDate { get; set; }

        [Required]
        public int? VoteNumber { get; set; }
    }
}
