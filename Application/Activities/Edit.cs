using AutoMapper;
using Domain;
using MediatR;
using Persistence;


namespace Application.Activities
{
    //**Use case: Edit an activity **
    //Type: Command Request Mediator
    public class Edit
    {
        public class Command :IRequest
        {
            public Activity  Activity{ get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;

            public Handler(DataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activityFromDB = await _dataContext.Activities.FindAsync(request.Activity.Id);
                //mapper benifit is just copy props drom requiest.Activity to activityFromDB using MappingProfiles.cs
                _mapper.Map(request.Activity, activityFromDB);
                
                await _dataContext.SaveChangesAsync();
            }
        }

    }
}
