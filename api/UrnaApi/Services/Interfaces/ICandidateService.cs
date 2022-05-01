using UrnaBackend.Dtos;
using UrnaEFCore.Entities;

namespace UrnaBackend.Services.Interfaces
{
    public interface ICandidateService
    {
        public Task DeleteCandidate(int candidateId);
        public Task AddCandidate(CandidateRegisterDto candidate);
        public CandidateUrnDto GetCandidateByElectoralNumber(int electoralNumber);
    }
}
