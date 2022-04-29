using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public int? VoteNumber { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public List<Vote>? Votes { get; set; }
    }
}
